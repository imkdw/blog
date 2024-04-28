import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';

import { AuthServiceKey } from '../../interfaces/auth.interface';
import AuthServiceStub from '../stubs/auth.service.stub';
import CookieServiceStub from '../stubs/cookie.service.stub';
import AuthController from '../../controllers/auth.controller';
import { CookieServiceKey } from '../../../../common/interfaces/cookie.interface';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthServiceKey,
          useClass: AuthServiceStub,
        },
        {
          provide: CookieServiceKey,
          useClass: CookieServiceStub,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  describe('refresh', () => {
    it('발급된 쿠키를 set-cookie 헤더를 통해서 반환하고, 성공 메시지를 반환한다.', () => {
      const cookie = 'refreshToken=token';
      const res = { cookie: jest.fn() } as unknown as Response;

      const result = authController.refresh(cookie, res);

      expect(res.cookie).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ isSuccess: true });
    });
  });
});
