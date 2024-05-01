import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { Response } from 'express';

import OAuthController from '../../controllers/oauth.controller';
import { OAuthServiceKey } from '../../interfaces/oauth.interface';
import OAuthServiceStub from '../stubs/oauth.service.stub';
import { OAuthProvider } from '../../enums/auth.enum';
import CookieServiceStub from '../stubs/cookie.service.stub';
import { CookieServiceKey } from '../../../../common/interfaces/cookie.interface';
import { RequestOAuthSignupDto } from '../../dto/request/oauth.dto';
import createUUID from '../../../../common/utils/uuid';
import { USER_DEFAULT_PROFILE } from '../../../user/constants/user.constant';
import { UserRole } from '../../../user/enums/user-role.enum';

describe('OAuthController', () => {
  let oAuthController: OAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OAuthController],
      providers: [
        {
          provide: OAuthServiceKey,
          useClass: OAuthServiceStub,
        },
        {
          provide: CookieServiceKey,
          useClass: CookieServiceStub,
        },
      ],
    }).compile();

    oAuthController = module.get<OAuthController>(OAuthController);
  });

  describe('googleOAuth', () => {
    it('구글 OAuth 인증 데이터를 반환한다', async () => {
      const result = await oAuthController.googleOAuth('authorization');

      expect(result.email).toBeDefined();
      expect(result.isExist).toBeFalsy();
      expect(result.provider).toBe(OAuthProvider.GOOGLE);
      expect(result.token).toBeDefined();
    });
  });

  describe('kakaoOAuth', () => {
    it('카카오 OAuth 인증 데이터를 반환한다', async () => {
      const result = await oAuthController.kakaoOAuth({ code: 'code', redirectUri: 'redirectUri' });

      expect(result.email).toBeDefined();
      expect(result.isExist).toBeFalsy();
      expect(result.provider).toBe(OAuthProvider.KAKAO);
      expect(result.token).toBeDefined();
    });
  });

  describe('githubOAuth', () => {
    it('깃허브 OAuth 인증 데이터를 반환한다', async () => {
      const result = await oAuthController.githubOAuth({ code: 'code', redirectUri: 'redirectUri' });

      expect(result.email).toBeDefined();
      expect(result.isExist).toBeFalsy();
      expect(result.provider).toBe(OAuthProvider.GITHUB);
      expect(result.token).toBeDefined();
    });
  });

  describe('oAuthSignUp', () => {
    it('OAuth 회원가입을 처리한다', async () => {
      const requestOAuthSignupDto: RequestOAuthSignupDto = {
        email: faker.internet.email(),
        provider: OAuthProvider.GOOGLE,
        token: createUUID(),
      };
      const res = { cookie: jest.fn() } as unknown as Response;

      const result = await oAuthController.oAuthSignUp(requestOAuthSignupDto, res);

      expect(result.accessToken).toBe('accessToken');
      expect(result.email).toBeDefined();
      expect(result.nickname).toBeDefined();
      expect(result.profile).toBe(USER_DEFAULT_PROFILE);
      expect(result.role).toBe(UserRole.NORMAL);
      expect(res.cookie).toHaveBeenCalledTimes(2);
    });
  });

  describe('oAuthSignIn', () => {
    it('OAuth 로그인을 처리한다', async () => {
      const requestOAuthSigninDto = {
        email: faker.internet.email(),
        provider: OAuthProvider.GOOGLE,
        token: createUUID(),
      };
      const res = { cookie: jest.fn() } as unknown as Response;

      const result = await oAuthController.oAuthSignIn(requestOAuthSigninDto, res);

      expect(result.accessToken).toBe('accessToken');
      expect(result.email).toBeDefined();
      expect(result.nickname).toBeDefined();
      expect(result.profile).toBe(USER_DEFAULT_PROFILE);
      expect(result.role).toBe(UserRole.NORMAL);
      expect(res.cookie).toHaveBeenCalledTimes(2);
    });
  });
});
