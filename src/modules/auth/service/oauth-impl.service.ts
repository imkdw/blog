import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { OAuthService } from '../types/service/auth-oauth.service';
import { MyApiService, MyApiServiceSymbol } from '../../../infra/api/types/my-api.service';
import { GoogleOAuthUserInfoResponse } from '../types/interfaces/external/google.interface';
import { OAuthProvider } from '../domain/ex-oauth-provider.entity';
import {
  ExOAuthProviderRepository,
  ExOAuthProviderRepositorySymbol,
} from '../types/repository/ex-oauth-provider.repository';
import { UserOAuthService, UserOAuthServiceSymbol } from '../../user/types/service/user-oauth.service';
import { UserService, UserServiceSymbol } from '../../user/types/service/user.service';
import { ExOAuthDataRepository, ExOAuthDataRepositorySymbol } from '../types/repository/ex-oauth-data.repository';
import ExternalOAuthData from '../domain/ex-oauth-data.entity';
import { ProcessOAuthDto, ProcessOAuthResult } from '../types/dto/internal/process-oauth.dto';
import createUUID from '../../../common/utils/uuid';
import { SYSTEM_USER_ID } from '../../../common/constants/system.constant';
import { OAuthSignUpDto } from '../types/dto/internal/oauth-sign-up.dto';
import { UserRoles, UserSignUpChannels } from '../../user/domain/user.entity';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import createCUID from '../../../common/utils/cuid';
import { MyJwtService, MyJwtServiceSymbol } from '../types/service/my-jwt.service';
import { OAuthSignInDto } from '../types/dto/internal/oauth-sign-in.dto';
import { KakaoOAuthDto } from '../types/dto/internal/kakao-oauth.dto';
import { KakaoTokenRequest, KakaoTokenResponse, KakaoUserResponse } from '../types/interfaces/external/kakao.interface';
import {
  GithubTokenRequest,
  GithubTokenResponse,
  GithubUserResponse,
} from '../types/interfaces/external/github.interface';
import { GithubOAuthDto } from '../types/dto/internal/github-oauth.dto';
import { MyConfigService, MyConfigServiceSymbol } from '../../../infra/config/types/my-config.service';
import { OAuthConfig } from '../../../infra/config/types/my-config.interface';
import { MyConfig } from '../../../infra/config/types/enum/my-config.enum';
import { UserRoleService, UserRoleServiceSymbol } from '../../user/types/service/user-role.service';
import { ExistEmailException } from '../../../common/exceptions/409';
import { ExOAuthProviderService, ExOAuthProviderServiceSymbol } from '../types/service/ex-oauth-provider.service';
import { AuthResult } from '../types/dto/internal/auth-result.dto';
import {
  OAuthProviderNotFoundException,
  UserRoleNotFoundException,
  UserSignupChannelNotFoundException,
} from '../../../common/exceptions/404';
import { OAuthFailureException } from '../../../common/exceptions/403';
import {
  UserSignupChannelService,
  UserSignupChannelServiceSymbol,
} from '../../user/types/service/user-signup-channel.service';
import { AuthMapper, AuthMapperSymbol } from '../types/mapper/auth.mapper';

@Injectable()
export default class OAuthServiceImpl implements OAuthService, OnModuleInit {
  private oAuthConfig: OAuthConfig;

  constructor(
    @Inject(MyApiServiceSymbol) private readonly myApiService: MyApiService,
    @Inject(ExOAuthProviderRepositorySymbol) private readonly exOAuthProviderRepository: ExOAuthProviderRepository,
    @Inject(UserServiceSymbol) private readonly userService: UserService,
    @Inject(UserOAuthServiceSymbol) private readonly userOAuthService: UserOAuthService,
    @Inject(ExOAuthDataRepositorySymbol) private readonly exOAuthDataRepository: ExOAuthDataRepository,
    @Inject(MyJwtServiceSymbol) private readonly myJwtService: MyJwtService,
    @Inject(MyConfigServiceSymbol) private readonly myConfigService: MyConfigService,
    @Inject(UserRoleServiceSymbol) private readonly userRoleService: UserRoleService,
    @Inject(ExOAuthProviderServiceSymbol) private readonly exOAuthProviderService: ExOAuthProviderService,
    @Inject(UserSignupChannelServiceSymbol) private readonly userSignupChannelService: UserSignupChannelService,
    @Inject(AuthMapperSymbol) private readonly authMapper: AuthMapper,
    private readonly prisma: PrismaService,
  ) {}

  async onModuleInit() {
    this.oAuthConfig = await this.myConfigService.getConfig<OAuthConfig>(MyConfig.OAUTH);
  }

  async googleOAuth(authorization: string): Promise<ProcessOAuthResult> {
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
      provider: OAuthProvider.GOOGLE,
      profile: googleUserInfo.picture,
    });

    return oAuthResult;
  }

  async kakaoOAuth(dto: KakaoOAuthDto): Promise<ProcessOAuthResult> {
    const { code, redirectUri } = dto;

    // code로 카카오 토큰을 조회하는 URL
    const GET_KAKAO_TOKEN_URL = `https://kauth.kakao.com/oauth/token`;
    const kakaoToken = await this.myApiService.post<KakaoTokenRequest, KakaoTokenResponse>(
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
    const kakaoUser = await this.myApiService.get<KakaoUserResponse>(GET_KAKAO_USER_URL, {
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
      provider: OAuthProvider.KAKAO,
      profile,
    });

    return response;
  }

  async githubOAuth(dto: GithubOAuthDto): Promise<ProcessOAuthResult> {
    const { code, redirectUri } = dto;
    const GET_GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
    const githubToken = await this.myApiService.post<GithubTokenRequest, GithubTokenResponse>(
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
    const githubUser = await this.myApiService.get<GithubUserResponse>(GET_GITHUB_USER_URL, {
      headers: {
        Authorization: `token ${githubToken.access_token}`,
      },
    });

    const response = await this.processOAuth({
      data: JSON.stringify(githubUser),
      email: githubUser.email,
      profile: githubUser.avatar_url,
      provider: OAuthProvider.GITHUB,
    });

    return response;
  }

  async oAuthSignUp(dto: OAuthSignUpDto): Promise<AuthResult> {
    const { email, provider, token } = dto;
    const user = await this.userService.findByEmail(email);
    if (user) throw new ExistEmailException(email);

    const oAuthProvider = await this.exOAuthProviderService.findByName(provider, { includeDeleted: false });
    if (!oAuthProvider) throw new OAuthProviderNotFoundException(provider);

    const userOAuth = await this.userOAuthService.findById(user.id);
    if (userOAuth) throw new OAuthFailureException();

    const oAuthData = await this.exOAuthDataRepository.findByToken(token);
    if (!oAuthData || oAuthData.email !== dto.email || oAuthData.providerId !== oAuthProvider.id) {
      throw new OAuthFailureException();
    }

    const userRole = await this.userRoleService.findByName(UserRoles.NORMAL, { includeDeleted: false });
    if (!userRole) throw new UserRoleNotFoundException(UserRoles.NORMAL);

    const signupChannel = await this.userSignupChannelService.findByName(UserSignUpChannels.OAUTH, {
      includeDeleted: false,
    });
    if (!signupChannel) throw new UserSignupChannelNotFoundException(UserSignUpChannels.OAUTH);

    const createdUser = await this.prisma.$transaction(async (tx) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const createdUser = await this.userService.createUser(
        {
          email: dto.email,
          nickname: createCUID().slice(0, 12),
          password: null,
          roleId: userRole.id,
          signUpChannelId: signupChannel.id,
          profile: oAuthData.profile,
        },
        tx,
      );

      await this.userOAuthService.createUserOAuth(
        {
          userId: createdUser.id,
          providerId: oAuthProvider.id,
        },
        tx,
      );

      return createdUser;
    });

    const accessToken = this.myJwtService.createToken({
      userId: createdUser.id,
      role: userRole.name,
      tokenType: 'access',
    });

    const refreshToken = this.myJwtService.createToken({
      userId: createdUser.id,
      role: userRole.name,
      tokenType: 'refresh',
    });

    return this.authMapper.toAuthResult(accessToken, refreshToken, createdUser, userRole);
  }

  async processOAuth(dto: ProcessOAuthDto): Promise<ProcessOAuthResult> {
    const { data, email, provider, profile } = dto;

    if (!email) throw new OAuthFailureException(email);

    const user = await this.userService.findByEmail(email);
    const userOAuth = await this.userOAuthService.findById(user?.id || '');
    const oAuthProvider = await this.exOAuthProviderService.findByName(provider, { includeDeleted: false });

    const newOAuthDataToken = createUUID();
    const existOAuthData = await this.exOAuthDataRepository.findByEmail(email, { includeDeleted: false });

    if (existOAuthData) {
      await this.exOAuthDataRepository.update(existOAuthData.id, { token: newOAuthDataToken });
    } else {
      const oAuthData = new ExternalOAuthData({
        email,
        providerId: oAuthProvider.id,
        data,
        token: newOAuthDataToken,
        createUser: SYSTEM_USER_ID,
        updateUser: SYSTEM_USER_ID,
        profile,
      });

      await this.exOAuthDataRepository.save(oAuthData);
    }

    // 이미 가입된 소셜로그인 유저로 판별
    if (user && userOAuth.providerId === oAuthProvider.id && existOAuthData) {
      return {
        isExist: true,
        provider: oAuthProvider.name,
        email,
        token: newOAuthDataToken,
      };
    }

    return {
      isExist: false,
      provider: oAuthProvider.name,
      email,
      token: newOAuthDataToken,
    };
  }

  async oAuthSignIn(dto: OAuthSignInDto): Promise<AuthResult> {
    const exOAuthData = await this.exOAuthDataRepository.findByToken(dto.token);
    if (!exOAuthData) throw new OAuthFailureException(dto.token);

    const user = await this.userService.findByEmail(dto.email);
    const userOAuth = await this.userOAuthService.findById(user?.id || '');
    if (!user || !userOAuth) throw new OAuthFailureException(dto.email);

    const userRole = await this.userRoleService.findByName(UserRoles.NORMAL, { includeDeleted: false });
    if (!userRole) throw new UserRoleNotFoundException(UserRoles.NORMAL);

    const accessToken = this.myJwtService.createToken({
      userId: user.id,
      role: userRole.name,
      tokenType: 'access',
    });

    const refreshToken = this.myJwtService.createToken({
      userId: user.id,
      role: userRole.name,
      tokenType: 'refresh',
    });

    return this.authMapper.toAuthResult(accessToken, refreshToken, user, userRole);
  }
}
