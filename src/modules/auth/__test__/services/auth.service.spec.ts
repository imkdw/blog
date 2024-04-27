import { Test, TestingModule } from '@nestjs/testing';
import { MyJwtServiceKey } from '../../interfaces/my-jwt.interface';
import { AuthServiceProvider } from '../../providers/auth.provider';
import MyJwtServiceStub from '../stubs/my-jwt.service.stub';
import { AuthServiceKey, IAuthService } from '../../interfaces/auth.interface';
import { InvalidRefreshTokenException, RefreshTokenExpiredException } from '../../../../common/exceptions/401';
import { JwtTokenType } from '../../enums/token.enum';

describe('AuthService', () => {
  let authService: IAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthServiceProvider,
        {
          provide: MyJwtServiceKey,
          useClass: MyJwtServiceStub,
        },
      ],
    }).compile();

    authService = module.get<IAuthService>(AuthServiceKey);
  });

  describe('refreshToken', () => {
    it('쿠키에서 파싱한 refresh 토큰이 없는 경우 InvalidRefreshTokenException이 발생', () => {
      const cookie = '';
      expect(() => authService.refreshToken(cookie)).toThrow(InvalidRefreshTokenException);
    });

    it('refresh 토큰이 만료된 경우 RefreshTokenExpiredException이 발생', () => {
      const cookie = 'refreshToken=expired_token';
      expect(() => authService.refreshToken(cookie)).toThrow(RefreshTokenExpiredException);
    });

    it('refresh 토큰이 유효한 경우 access 토큰을 생성하여 반환', () => {
      const cookie = 'refreshToken=valid_token';
      const accessToken = authService.refreshToken(cookie);
      expect(accessToken).toBe(`token-${JwtTokenType.ACCESS}-userId`);
    });
  });
});
