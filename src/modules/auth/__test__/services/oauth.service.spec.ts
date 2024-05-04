/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import {
  GetGithubUserResponse,
  GetKakaoUserResponse,
  GoogleOAuthUserInfoResponse,
  IOAuthService,
  OAuthDataRepositoryKey,
  OAuthProviderRepositoryKey,
  OAuthServiceKey,
  PostGithubTokenResponse,
  PostKakaoTokenResponse,
} from '../../interfaces/oauth.interface';
import OAuthService from '../../services/oauth.service';
import MyApiServiceStub from '../../../../__test__/stubs/my-api.service.stub';
import { MyApiServiceKey } from '../../../../infra/api/interfaces/my-api.interface';
import OAuthProviderRepositoryStub from '../stubs/oauth-provider.repository.stub';
import OAuthDataRepositoryStub from '../stubs/oauth-data.repository.stub';
import UserServiceStub from '../../../user/__test__/stubs/user.service.stub';
import { UserServiceKey } from '../../../user/interfaces/user.interface';
import UserRoleServiceStub from '../../../user/__test__/stubs/user-role.service.stub';
import UserSignupChannelServiceStub from '../../../user/__test__/stubs/user-signup-channel.service.stub';
import { UserRoleServiceKey } from '../../../user/interfaces/user-role.interface';
import { UserSignupChannelServiceKey } from '../../../user/interfaces/user-signup-channel.interface';
import MyJwtServiceStub from '../stubs/my-jwt.service.stub';
import { MyJwtServiceKey } from '../../interfaces/my-jwt.interface';
import PrismaService from '../../../../infra/database/prisma/service/prisma.service';
import MyConfigServiceStub from '../../../__test__/stubs/my-config.service.stub';
import { MyConfigServiceKey } from '../../../../infra/config/interfaces/my-config.interface';
import { OAuthDto, OAuthResult, ProcessOAuthDto } from '../../dto/internal/oauth.dto';
import { OAuthFailureException } from '../../../../common/exceptions/401';
import {
  OAuthProviderNotFoundException,
  UserRoleNotFoundException,
  UserSignupChannelNotFoundException,
} from '../../../../common/exceptions/404';
import createUUID from '../../../../common/utils/uuid';
import { AuthResult } from '../../dto/internal/auth-result.dto';
import { JwtTokenType } from '../../enums/token.enum';
import { USER_DEFAULT_PROFILE } from '../../../user/constants/user.constant';
import { OAuthDataBuilder } from '../../entities/oauth-data/oauth-data.entity';
import { OAuthProviders } from '../../enums/auth.enum';
import { UserRoles } from '../../../user/enums/user-role.enum';

describe('OAuthService', () => {
  let oAuthService: IOAuthService;
  let myApiService: MyApiServiceStub;
  let myConfigService: MyConfigServiceStub;
  let oAuthProviderRepository: OAuthProviderRepositoryStub;
  let oAuthDataRepository: OAuthDataRepositoryStub;
  let userService: UserServiceStub;
  let userRoleService: UserRoleServiceStub;
  let userSigupChannelService: UserSignupChannelServiceStub;
  let myJwtService: MyJwtServiceStub;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: OAuthServiceKey,
          useClass: OAuthService,
        },
        {
          provide: MyApiServiceKey,
          useClass: MyApiServiceStub,
        },
        {
          provide: MyConfigServiceKey,
          useClass: MyConfigServiceStub,
        },
        {
          provide: UserServiceKey,
          useClass: UserServiceStub,
        },
        {
          provide: UserRoleServiceKey,
          useClass: UserRoleServiceStub,
        },
        {
          provide: UserSignupChannelServiceKey,
          useClass: UserSignupChannelServiceStub,
        },
        {
          provide: MyJwtServiceKey,
          useClass: MyJwtServiceStub,
        },
        {
          provide: OAuthProviderRepositoryKey,
          useClass: OAuthProviderRepositoryStub,
        },
        {
          provide: OAuthDataRepositoryKey,
          useClass: OAuthDataRepositoryStub,
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    oAuthService = module.get<IOAuthService>(OAuthServiceKey);
    myApiService = module.get<MyApiServiceStub>(MyApiServiceKey);
    myConfigService = module.get<MyConfigServiceStub>(MyConfigServiceKey);
    oAuthProviderRepository = module.get<OAuthProviderRepositoryStub>(OAuthProviderRepositoryKey);
    oAuthDataRepository = module.get<OAuthDataRepositoryStub>(OAuthDataRepositoryKey);
    userService = module.get<UserServiceStub>(UserServiceKey);
    userRoleService = module.get<UserRoleServiceStub>(UserRoleServiceKey);
    userSigupChannelService = module.get<UserSignupChannelServiceStub>(UserSignupChannelServiceKey);
    myJwtService = module.get<MyJwtServiceStub>(MyJwtServiceKey);

    oAuthDataRepository.reset();
    myApiService.reset();
    userRoleService.reset();
    userService.reset();
    oAuthProviderRepository.reset();
    await oAuthService.onModuleInit();
  });

  describe('processOAuth', () => {
    it('이메일이 없는 경우 OAuthFailureException 예외를 던진다', () => {
      const dto: ProcessOAuthDto = { data: '', email: '', profile: '', provider: OAuthProviders.GOOGLE };

      expect(() => oAuthService.processOAuth(dto)).rejects.toThrow(OAuthFailureException);
    });

    it('소셜로그인 프로바이더가 없는경우 OAuthProviderNotFoundException 예외를 던진다', () => {
      const dto: ProcessOAuthDto = {
        data: '',
        email: faker.internet.email(),
        profile: '',
        provider: OAuthProviders.GOOGLE,
      };

      expect(() => oAuthService.processOAuth(dto)).rejects.toThrow(OAuthProviderNotFoundException);
    });

    it.todo('추가 로직 검사');
  });

  describe('googleOAuth', () => {
    it('OAuth 처리결과를반환한다', async () => {
      const GET_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';
      const googleResponse: GoogleOAuthUserInfoResponse = {
        email: faker.internet.email(),
        family_name: faker.person.firstName(),
        given_name: faker.person.lastName(),
        hd: faker.internet.domainName(),
        id: faker.internet.userName(),
        locale: faker.string.alpha(),
        name: faker.person.fullName(),
        picture: faker.image.url(),
        verified_email: true,
      };
      myApiService.setGetResponseMap(GET_USER_INFO_URL, googleResponse);
      oAuthProviderRepository.init();

      const result = await oAuthService.googleOAuth('');

      expect(result.email).toBe(googleResponse.email);
      expect(result.isExist).toBe(false);
      expect(result.provider).toBe(OAuthProviders.GOOGLE);
    });
  });

  describe('githubOAuth', () => {
    it('OAuth 처리결과를반환한다', async () => {
      const GET_GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
      const postGithubTokenResponse: PostGithubTokenResponse = {
        access_token: '',
        scope: '',
        token_type: '',
      };
      myApiService.setPostResponseMap(GET_GITHUB_TOKEN_URL, postGithubTokenResponse);

      const GET_GITHUB_USER_URL = 'https://api.github.com/user';
      const getGithubUserResponse: Partial<GetGithubUserResponse> = {
        email: faker.internet.email(),
        avatar_url: faker.image.url(),
      };
      myApiService.setGetResponseMap(GET_GITHUB_USER_URL, getGithubUserResponse);

      oAuthProviderRepository.init();

      const result = await oAuthService.githubOAuth('', '');

      expect(result.email).toBe(getGithubUserResponse.email);
      expect(result.isExist).toBe(false);
      expect(result.provider).toBe(OAuthProviders.GITHUB);
    });
  });

  describe('kakaoOAuth', () => {
    it('OAuth 처리결과를 반환한다', async () => {
      const GET_KAKAO_TOKEN_URL = `https://kauth.kakao.com/oauth/token`;
      const postKakaoTokenResponse: Partial<PostKakaoTokenResponse> = {
        access_token: '',
      };
      myApiService.setPostResponseMap(GET_KAKAO_TOKEN_URL, postKakaoTokenResponse);

      const GET_KAKAO_USER_URL = 'https://kapi.kakao.com/v2/user/me';
      const getKakaoUserResponse: Partial<GetKakaoUserResponse> = {
        kakao_account: {
          profile_image_needs_agreement: true,
          profile: {
            thumbnail_image_url: '',
            profile_image_url: '',
            is_default_image: true,
          },
          has_email: true,
          email_needs_agreement: true,
          is_email_valid: true,
          is_email_verified: true,
          email: faker.internet.email(),
        },
      };
      myApiService.setGetResponseMap(GET_KAKAO_USER_URL, getKakaoUserResponse);

      oAuthProviderRepository.init();

      const result = await oAuthService.kakaoOAuth('', '');
      expect(result.email).toBe(getKakaoUserResponse.kakao_account.email);
      expect(result.isExist).toBe(false);
      expect(result.provider).toBe(OAuthProviders.KAKAO);
    });
  });

  describe('OAuthSignIn', () => {
    it('소셜로그인 데이터가 없는경우 OAuthFailureException 예외를 던진다', async () => {
      const dto: OAuthDto = { email: '', provider: '', token: '' };
      await expect(() => oAuthService.oAuthSignIn(dto)).rejects.toThrow(OAuthFailureException);
    });

    it('유저가 존재하지 않는 경우 OAuthFailureException 예외를 던진다', async () => {
      const token = createUUID();
      const oAuthData = new OAuthDataBuilder().token(token).build();
      await oAuthDataRepository.save(oAuthData);
      const dto: OAuthDto = { email: '', provider: '', token };

      await expect(() => oAuthService.oAuthSignIn(dto)).rejects.toThrow(OAuthFailureException);
    });

    it('유저의 권한정보가 없으면 UserRoleNotFoundException 예외를 던진다', async () => {
      const token = createUUID();
      userRoleService.reset();

      const oAuthData = new OAuthDataBuilder().email(faker.internet.email()).token(token).build();
      await oAuthDataRepository.save(oAuthData);
      await userService.create({
        email: oAuthData.email,
        nickname: '',
        roleId: 1,
        signupChannelId: 1,
        oAuthProviderId: 1,
      });

      const dto: OAuthDto = { email: oAuthData.email, provider: '', token };

      await expect(() => oAuthService.oAuthSignIn(dto)).rejects.toThrow(UserRoleNotFoundException);
    });

    it('소셜로그인 성공시 AuthResult 데이터를 반환한다', async () => {
      const token = createUUID();

      const oAuthData = new OAuthDataBuilder().email(faker.internet.email()).token(token).build();
      await oAuthDataRepository.save(oAuthData);
      await userService.create({
        email: oAuthData.email,
        nickname: 'nickname',
        roleId: 1,
        signupChannelId: 1,
        oAuthProviderId: 1,
      });
      userRoleService.init();

      const dto: OAuthDto = { email: oAuthData.email, provider: '', token };
      const authResult: AuthResult = {
        accessToken: JwtTokenType.ACCESS,
        email: oAuthData.email,
        nickname: 'nickname',
        profile: USER_DEFAULT_PROFILE,
        refreshToken: JwtTokenType.REFRESH,
        role: UserRoles.NORMAL,
      };

      const result = await oAuthService.oAuthSignIn(dto);
      expect(result).toEqual(authResult);
    });
  });

  describe('OAuthSignUp', () => {
    it('유저 권한정보가 없으면 UserRoleNotFoundException 예외를 던진다', async () => {
      const token = createUUID();
      userRoleService.reset();

      const oAuthData = new OAuthDataBuilder().email(faker.internet.email()).token(token).build();
      await oAuthDataRepository.save(oAuthData);
      await userService.create({
        email: oAuthData.email,
        nickname: '',
        roleId: 1,
        signupChannelId: 1,
        oAuthProviderId: 1,
      });

      const dto: OAuthDto = { email: oAuthData.email, provider: '', token };

      await expect(() => oAuthService.oAuthSignUp(dto)).rejects.toThrow(UserRoleNotFoundException);
    });

    it('유저 가입경로 데이터가 없으면 UserSignupChannelNotFoundException 예외를 던진다', async () => {
      const token = createUUID();

      const oAuthData = new OAuthDataBuilder().email(faker.internet.email()).token(token).build();
      await oAuthDataRepository.save(oAuthData);
      await userService.create({
        email: oAuthData.email,
        nickname: '',
        roleId: 1,
        signupChannelId: 1,
        oAuthProviderId: 1,
      });
      userRoleService.init();

      const dto: OAuthDto = { email: oAuthData.email, provider: '', token };

      await expect(() => oAuthService.oAuthSignUp(dto)).rejects.toThrow(UserSignupChannelNotFoundException);
    });

    it('소셜로그인 제공자 정보가 없으면 OAuthProviderNotFoundException 예외를 던진다', async () => {
      const token = createUUID();

      const oAuthData = new OAuthDataBuilder().email(faker.internet.email()).token(token).build();
      await oAuthDataRepository.save(oAuthData);
      await userService.create({
        email: oAuthData.email,
        nickname: '',
        roleId: 1,
        signupChannelId: 1,
        oAuthProviderId: 1,
      });
      userRoleService.init();
      userSigupChannelService.init();

      const dto: OAuthDto = { email: oAuthData.email, provider: '', token };

      await expect(() => oAuthService.oAuthSignUp(dto)).rejects.toThrow(OAuthProviderNotFoundException);
    });

    it('소셜로그인 데이터가 없으면 OAuthFailureException 예외를 던진다', async () => {
      const token = createUUID();

      userRoleService.init();
      userSigupChannelService.init();
      oAuthProviderRepository.init();

      const dto: OAuthDto = { email: '', provider: OAuthProviders.GOOGLE, token };

      await expect(() => oAuthService.oAuthSignUp(dto)).rejects.toThrow(OAuthFailureException);
    });

    it('소셜로그인 성공시 AuthResult 데이터를 반환한다', async () => {
      const token = createUUID();
      const email = faker.internet.email();
      const oAuthData = new OAuthDataBuilder().providerId(1).email(email).token(token).build();
      await oAuthDataRepository.save(oAuthData);
      userRoleService.init();
      userSigupChannelService.init();
      oAuthProviderRepository.init();

      const dto: OAuthDto = { email, provider: OAuthProviders.GOOGLE, token };

      const result = await oAuthService.oAuthSignUp(dto);
      const user = await userService.findByEmail(email);

      const authResult: AuthResult = {
        accessToken: JwtTokenType.ACCESS,
        email,
        nickname: user.nickname,
        profile: USER_DEFAULT_PROFILE,
        refreshToken: JwtTokenType.REFRESH,
        role: UserRoles.NORMAL,
      };
      expect(result).toEqual(authResult);
    });
  });
});
