import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { AuthOAuthService } from '../types/service/auth-oauth.service';
import { MyApiService, MyApiServiceSymbol } from '../../../infra/api/types/my-api.service';
import { GoogleOAuthUserInfoResponse } from '../types/interfaces/external/google.interface';
import ExternalOAuthProvider, { OAuthProvider } from '../domain/ex-oauth-provider';
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
import { SignInResult } from '../types/dto/internal/sign-in.dto';
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

@Injectable()
export default class AuthOAuthServiceImpl implements AuthOAuthService, OnModuleInit {
  private oAuthConfig: OAuthConfig;

  constructor(
    @Inject(MyApiServiceSymbol) private readonly myApiService: MyApiService,
    @Inject(ExOAuthProviderRepositorySymbol) private readonly exOAuthProviderRepository: ExOAuthProviderRepository,
    @Inject(UserServiceSymbol) private readonly userService: UserService,
    @Inject(UserOAuthServiceSymbol) private readonly userOAuthService: UserOAuthService,
    @Inject(ExOAuthDataRepositorySymbol) private readonly exOAuthDataRepository: ExOAuthDataRepository,
    @Inject(MyJwtServiceSymbol) private readonly myJwtService: MyJwtService,
    @Inject(MyConfigServiceSymbol) private readonly myConfigService: MyConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async onModuleInit() {
    this.oAuthConfig = await this.myConfigService.getConfig<OAuthConfig>(MyConfig.OAUTH);
  }

  async findOAuthProviderByName(name: string): Promise<ExternalOAuthProvider | null> {
    const provider = await this.exOAuthProviderRepository.findByName(name);
    return provider;
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
      oAuthProvider: OAuthProvider.GOOGLE,
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
      oAuthProvider: OAuthProvider.KAKAO,
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
      oAuthProvider: OAuthProvider.GITHUB,
      profile: githubUser.avatar_url,
    });

    return response;
  }

  async oAuthSignUp(dto: OAuthSignUpDto): Promise<SignInResult> {
    const user = await this.userService.findByEmail(dto.email);
    if (user) {
      // TODO: 에러처리
      throw new ConflictException('이미 가입된 이메일 주소입니다');
    }

    const provider = await this.findOAuthProviderByName(dto.provider);
    if (!provider) {
      // TODO: 에러처리
      throw new NotFoundException('소셜로그인 제공사 정보를 찾을 수 없습니다');
    }

    const userOAuth = await this.userOAuthService.findById(user?.id || '');
    if (userOAuth) {
      // TODO: 에러처리
      throw new ConflictException('이미 가입된 회원입니다.');
    }

    const oAuthData = await this.exOAuthDataRepository.findByToken(dto.token);
    if (!oAuthData || oAuthData.email !== dto.email || oAuthData.providerId !== provider.id) {
      // TODO: 에러처리
      throw new ForbiddenException('소셜로그인 정보를 찾을 수 없습니다');
    }

    const createdUser = await this.prisma.$transaction(async (tx) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const createdUser = await this.userService.createUser(
        {
          email: dto.email,
          nickname: createCUID().slice(0, 12),
          password: null,
          role: UserRoles.NORMAL,
          signUpChannel: UserSignUpChannels.OAUTH,
          profile: oAuthData.profile,
        },
        tx,
      );

      await this.userOAuthService.createUserOAuth(
        {
          userId: createdUser.id,
          providerId: provider.id,
        },
        tx,
      );

      return createdUser;
    });

    const userRole = await this.userService.findUserRoleById(createdUser.roleId);
    if (!userRole) {
      // TODO: 에러처리
      throw new NotFoundException('사용자 권한 정보를 찾을 수 없습니다.');
    }

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

    return { email: dto.email, accessToken, refreshToken };
  }

  async processOAuth(dto: ProcessOAuthDto): Promise<ProcessOAuthResult> {
    const { data, email, oAuthProvider, profile } = dto;

    if (!email) {
      // TODO: 에러처리
      throw new NotFoundException('소셜로그인 정보를 찾을 수 없습니다');
    }

    const provider = await this.findOAuthProviderByName(oAuthProvider);
    if (!provider) {
      // TODO: 에러처리
      throw new Error('소셜로그인 제공사 정보를 확인할 수 없습니다');
    }

    const user = await this.userService.findByEmail(email);
    const userOAuth = await this.userOAuthService.findById(user?.id || '');

    const newOAuthDataToken = createUUID();
    const existOAuthData = await this.exOAuthDataRepository.findByEmailAndProvider(email, provider.id);
    if (existOAuthData) {
      await this.exOAuthDataRepository.update(existOAuthData.id, { token: newOAuthDataToken });
    } else {
      // 만약 인증 이력이 없다면 새로운 데이터를 추가한다
      const oAuthData = new ExternalOAuthData({
        email,
        providerId: provider.id,
        data,
        token: newOAuthDataToken,
        createUser: SYSTEM_USER_ID,
        updateUser: SYSTEM_USER_ID,
        profile,
      });
      await this.exOAuthDataRepository.save(oAuthData);
    }

    // 이미 가입된 소셜로그인 유저로 판별
    if (user && userOAuth.providerId === provider.id && existOAuthData) {
      return {
        isExist: true,
        provider: oAuthProvider,
        email,
        token: newOAuthDataToken,
      };
    }

    return {
      isExist: false,
      provider: oAuthProvider,
      email,
      token: newOAuthDataToken,
    };
  }

  async oAuthSignIn(dto: OAuthSignInDto): Promise<SignInResult> {
    const exOAuthData = await this.exOAuthDataRepository.findByToken(dto.token);
    if (!exOAuthData) {
      // TODO: 에러처리
      throw new ForbiddenException('소셜로그인 정보를 찾을 수 없습니다');
    }

    const user = await this.userService.findByEmail(dto.email);
    const userOAuth = await this.userOAuthService.findById(user?.id || '');
    if (!user || !userOAuth) {
      // TODO: 에러처리
      throw new ForbiddenException('가입된 회원 정보를 찾을 수 없습니다');
    }

    const userRole = await this.userService.findUserRoleById(user.roleId);
    if (!userRole) {
      // TODO: 에러처리
      throw new NotFoundException('사용자 권한 정보를 찾을 수 없습니다.');
    }

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

    return { email: dto.email, accessToken, refreshToken };
  }
}
