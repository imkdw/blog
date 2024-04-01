import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  GetGithubUserResponse,
  GetKakaoUserResponse,
  GoogleOAuthUserInfoResponse,
  IOAuthDataRepository,
  IOAuthProviderRepository,
  IOAuthService,
  OAuthDataRepositoryKey,
  OAuthProviderRepositoryKey,
  PostGithubTokenBody,
  PostGithubTokenResponse,
  PostKakaoTokenBody,
  PostKakaoTokenResponse,
  ProcessOAuthResult,
} from '../interfaces/oauth.interface';
import { AuthResult } from '../dto/internal/auth-result.dto';
import { IMyApiService, MyApiServiceKey } from '../../../infra/api/interfaces/my-api.interface';
import { OAuthProviders } from '../domain/entities/oauth-provider.entity';
import {
  IMyConfigService,
  MyConfigServiceKey,
  OAuthConfig,
} from '../../../infra/config/interfaces/my-config.interface';
import { MyConfig } from '../../../infra/config/enums/my-config.enum';
import { OAuthDto, OAuthResult, ProcessOAuthDto } from '../dto/internal/oauth.dto';
import { OAuthFailureException } from '../../../common/exceptions/401';
import createUUID from '../../../common/utils/uuid';
import NewOAuthAuthenticate from '../domain/models/new-oauth-authenticate.model';
import { IUserService, UserServiceKey } from '../../user/interfaces/user.interface';
import { UserRoles } from '../../user/domain/entities/user-role.entity';
import { UserSignupChannels } from '../../user/domain/entities/user-signup-channel.entity';
import { IUserRoleService, UserRoleServiceKey } from '../../user/interfaces/user-role.interface';
import {
  IUserSignupChannelService,
  UserSignupChannelServiceKey,
} from '../../user/interfaces/user-signup-channel.interface';
import {
  OAuthProviderNotFoundException,
  UserRoleNotFoundException,
  UserSignupChannelNotFoundException,
} from '../../../common/exceptions/404';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { IMyJwtService, MyJwtServiceKey } from '../interfaces/my-jwt.interface';
import { AuthMapperKey, IAuthMapper } from '../interfaces/auth.interface';
import createCUID from '../../../common/utils/cuid';
import { ExistEmailException } from '../../../common/exceptions/409';

@Injectable()
export default class OAuthService implements IOAuthService, OnModuleInit {
  private oAuthConfig: OAuthConfig;

  constructor(
    @Inject(MyApiServiceKey) private readonly myApiService: IMyApiService,
    @Inject(MyConfigServiceKey) private readonly myConfigService: IMyConfigService,
    @Inject(OAuthProviderRepositoryKey) private readonly oAuthProviderRepository: IOAuthProviderRepository,
    @Inject(OAuthDataRepositoryKey) private readonly oAuthDataRepository: IOAuthDataRepository,
    @Inject(UserServiceKey) private readonly userService: IUserService,
    @Inject(UserRoleServiceKey) private readonly userRoleService: IUserRoleService,
    @Inject(UserSignupChannelServiceKey) private readonly userSignupChannelService: IUserSignupChannelService,
    @Inject(MyJwtServiceKey) private readonly myJwtService: IMyJwtService,
    @Inject(AuthMapperKey) private readonly authMapper: IAuthMapper,
    private readonly prisma: PrismaService,
  ) {}

  async onModuleInit() {
    this.oAuthConfig = await this.myConfigService.getConfig(MyConfig.OAUTH);
  }

  async googleOAuth(authorization: string): Promise<OAuthResult> {
    // 클라이언트에서 발급한 access_token으로 유저정보를 조회하는 API
    const GET_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

    const googleUserInfo = await this.myApiService.get<GoogleOAuthUserInfoResponse>(GET_USER_INFO_URL, {
      headers: {
        Authorization: `Bearer ${authorization}`,
      },
    });

    const oAuthResult = await this.processOAuth({
      data: JSON.stringify(googleUserInfo),
      email: googleUserInfo.email,
      provider: OAuthProviders.GOOGLE,
      profile: googleUserInfo.picture,
    });

    return oAuthResult;
  }

  async githubOAuth(code: string, redirectUri: string): Promise<OAuthResult> {
    const GET_GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
    const githubToken = await this.myApiService.post<PostGithubTokenBody, PostGithubTokenResponse>(
      GET_GITHUB_TOKEN_URL,
      {
        client_id: this.oAuthConfig.github.clientId,
        client_secret: this.oAuthConfig.github.clientSecret,
        code,
        redirect_uri: redirectUri,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    const GET_GITHUB_USER_URL = 'https://api.github.com/user';
    const githubUser = await this.myApiService.get<GetGithubUserResponse>(GET_GITHUB_USER_URL, {
      headers: {
        Authorization: `token ${githubToken.access_token}`,
      },
    });

    const response = await this.processOAuth({
      data: JSON.stringify(githubUser),
      email: githubUser.email,
      profile: githubUser.avatar_url,
      provider: OAuthProviders.GITHUB,
    });

    return response;
  }

  async kakaoOAuth(code: string, redirectUri: string): Promise<OAuthResult> {
    // code로 카카오 토큰을 조회하는 URL
    const GET_KAKAO_TOKEN_URL = `https://kauth.kakao.com/oauth/token`;
    const kakaoToken = await this.myApiService.post<PostKakaoTokenBody, PostKakaoTokenResponse>(
      GET_KAKAO_TOKEN_URL,
      {
        grant_type: 'authorization_code',
        client_id: this.oAuthConfig.kakao.clientId,
        redirect_uri: redirectUri,
        code,
      },
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );

    // 발급된 토큰으로 유저정보를 조회하는 URL
    const GET_KAKAO_USER_URL = 'https://kapi.kakao.com/v2/user/me';
    const kakaoUser = await this.myApiService.get<GetKakaoUserResponse>(GET_KAKAO_USER_URL, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${kakaoToken?.access_token || ''}`,
      },
    });

    const profile = kakaoUser.kakao_account.profile.thumbnail_image_url;
    const { email } = kakaoUser.kakao_account;
    const oAuthData = JSON.stringify(kakaoUser);

    const response = await this.processOAuth({
      data: oAuthData,
      email,
      provider: OAuthProviders.KAKAO,
      profile,
    });

    return response;
  }

  async oAuthSignIn(dto: OAuthDto): Promise<AuthResult> {
    const exOAuthData = await this.oAuthDataRepository.findByToken(dto.token, { includeDeleted: false });
    if (!exOAuthData) throw new OAuthFailureException(dto.token);

    const existUser = await this.userService.findByEmail(dto.email, { includeDeleted: false });
    if (!existUser) throw new OAuthFailureException(dto.email);

    const userRole = await this.userRoleService.findById(existUser.roleId, { includeDeleted: false });
    if (!userRole) throw new UserRoleNotFoundException(existUser.roleId.toString());

    const [accessToken, refreshToken] = [
      this.myJwtService.createToken('access', existUser.id),
      this.myJwtService.createToken('refresh', existUser.id),
    ];

    return this.authMapper.toAuthResult(existUser, userRole, accessToken, refreshToken);
  }

  async oAuthSignUp(dto: OAuthDto): Promise<AuthResult> {
    const [userRole, userSignupChannel, oAuthProvider] = await Promise.all([
      this.userRoleService.findByName(UserRoles.NORMAL, { includeDeleted: true }),
      this.userSignupChannelService.findByName(UserSignupChannels.OAUTH, { includeDeleted: true }),
      this.oAuthProviderRepository.findByName(dto.provider),
    ]);

    if (!userRole) throw new UserRoleNotFoundException(UserRoles.NORMAL);
    if (!userSignupChannel) throw new UserSignupChannelNotFoundException();
    if (!oAuthProvider) throw new OAuthProviderNotFoundException(dto.provider);

    const oAuthData = await this.oAuthDataRepository.findByEmailAndProviderId(dto.email, oAuthProvider.id, {
      includeDeleted: false,
    });
    if (!oAuthData) throw new OAuthFailureException(dto.email);

    const ramdomNickname = createCUID().slice(0, 12);
    const signedUser = await this.prisma.$transaction(async (tx) => {
      const createdUser = await this.userService.create(
        {
          email: dto.email,
          nickname: ramdomNickname,
          roleId: userRole.id,
          signupChannelId: userSignupChannel.id,
          oAuthProviderId: oAuthProvider.id,
        },
        tx,
      );

      await this.userService.update(createdUser.id, { createUser: createdUser.id, updateUser: createdUser.id }, tx);

      return createdUser;
    });

    const [accessToken, refreshToken] = [
      this.myJwtService.createToken('access', signedUser.id),
      this.myJwtService.createToken('refresh', signedUser.id),
    ];

    return this.authMapper.toAuthResult(signedUser, userRole, accessToken, refreshToken);
  }

  async processOAuth(dto: ProcessOAuthDto): Promise<ProcessOAuthResult> {
    if (!dto?.email) throw new OAuthFailureException(dto.data);

    const oAuthProvider = await this.oAuthProviderRepository.findByName(dto.provider);
    const oAuthData = await this.oAuthDataRepository.findByEmailAndProviderId(dto.email, oAuthProvider.id, {
      includeDeleted: false,
    });

    /**
     * 기존에 OAuth 인증 이력이 존재하면 새롭게 토큰을 발급해서 업데이트한다.
     * 토큰의 경우 OAuth 인증 이후에 로그인, 회원가입에서 사용된다
     *
     * 없는 경우는 새로운 OAuth 인증 이력을 저장한다.
     */
    const newOAuthToken = createUUID();
    if (oAuthData) {
      await this.oAuthDataRepository.update(oAuthData.id, { token: newOAuthToken });
    } else {
      const newOAuthAuthenticate = new NewOAuthAuthenticate(dto.email, oAuthProvider.id, newOAuthToken, dto.data);
      await this.oAuthDataRepository.save(newOAuthAuthenticate);
    }

    const existUser = await this.userService.findByEmail(dto.email, { includeDeleted: true });
    if (existUser && existUser.oAuthProviderId !== oAuthProvider.id) throw new ExistEmailException(dto.email);

    if (existUser) {
      return { email: existUser.email, isExist: true, provider: dto.provider, token: newOAuthToken };
    }

    return {
      email: dto.email,
      isExist: false,
      provider: dto.provider,
      token: newOAuthToken,
    };
  }
}
