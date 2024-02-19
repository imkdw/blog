import { ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AuthOAuthService } from '../types/service/auth-oauth.service';
import { MyApiService, MyApiServiceSymbol } from '../../../infra/api/types/my-api.service';
import { GoogleOAuthUserInfoResponse } from '../types/interfaces/external/google.interface';
import ExternalOAuthProvider, { IOAuthProvider, OAuthProvider } from '../domain/ex-oauth-provider';
import {
  ExOAuthProviderRepository,
  ExOAuthProviderRepositorySymbol,
} from '../types/repository/ex-oauth-provider.repository';
import { UserOAuthService, UserOAuthServiceSymbol } from '../../user/types/service/user-oauth.service';
import { UserService, UserServiceSymbol } from '../../user/types/service/user.service';
import { ExOAuthDataRepository, ExOAuthDataRepositorySymbol } from '../types/repository/ex-oauth-data.repository';
import ExternalOAuthData from '../domain/ex-oauth-data.entity';
import { ProcessOAuthResult } from '../types/dto/internal/process-oauth.dto';
import createUUID from '../../../common/utils/uuid';
import { SYSTEM_USER_ID } from '../../../common/constants/system.constant';
import { OAuthSignUpDto } from '../types/dto/internal/oauth-sign-up.dto';
import { UserRoles, UserSignUpChannels } from '../../user/domain/user.entity';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import createCUID from '../../../common/utils/cuid';
import { MyJwtService, MyJwtServiceSymbol } from '../types/service/my-jwt.service';
import { SignUpResult } from '../types/dto/internal/sign-up.dto';

@Injectable()
export default class AuthOAuthServiceImpl implements AuthOAuthService {
  constructor(
    @Inject(MyApiServiceSymbol) private readonly myApiService: MyApiService,
    @Inject(ExOAuthProviderRepositorySymbol) private readonly exOAuthProviderRepository: ExOAuthProviderRepository,
    @Inject(UserServiceSymbol) private readonly userService: UserService,
    @Inject(UserOAuthServiceSymbol) private readonly userOAuthService: UserOAuthService,
    @Inject(ExOAuthDataRepositorySymbol) private readonly exOAuthDataRepository: ExOAuthDataRepository,
    @Inject(MyJwtServiceSymbol) private readonly myJwtService: MyJwtService,
    private readonly prisma: PrismaService,
  ) {}

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

    const oAuthResult = await this.processOAuth(
      googleUserInfo?.email,
      OAuthProvider.GOOGLE,
      JSON.stringify(googleUserInfo),
    );

    return oAuthResult;
  }

  async oAuthSignUp(dto: OAuthSignUpDto): Promise<SignUpResult> {
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

    const oAuthData = await this.exOAuthDataRepository.findByEmailAndProvider(dto.email, provider.id);
    if (!oAuthData) {
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

  async processOAuth(email: string, oAuthProvider: IOAuthProvider, data: string): Promise<ProcessOAuthResult> {
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
      });
      await this.exOAuthDataRepository.save(oAuthData);
    }

    // 이미 가입된 소셜로그인 유저로 판별
    if (user && userOAuth.providerId === provider.id && existOAuthData) {
      return {
        isExist: true,
        provider: oAuthProvider,
        email,
        token: existOAuthData.token,
      };
    }

    return {
      isExist: false,
      provider: oAuthProvider,
      email,
      token: newOAuthDataToken,
    };
  }
}
