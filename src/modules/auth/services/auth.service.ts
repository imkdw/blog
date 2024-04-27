import { Inject, Injectable } from '@nestjs/common';
import { IAuthService } from '../interfaces/auth.interface';
import { parseRefreshTokenByCookie } from '../functions/cookie.function';
import { InvalidRefreshTokenException, RefreshTokenExpiredException } from '../../../common/exceptions/401';
import { IMyJwtService, MyJwtServiceKey } from '../interfaces/my-jwt.interface';
import { JwtTokenType } from '../enums/token.enum';

@Injectable()
export default class AuthService implements IAuthService {
  constructor(@Inject(MyJwtServiceKey) private readonly myJwtService: IMyJwtService) {}

  refreshToken(cookie: string): string {
    const refreshToken = parseRefreshTokenByCookie(cookie);
    if (!refreshToken) throw new InvalidRefreshTokenException(cookie);

    try {
      const { userId } = this.myJwtService.verify(refreshToken);
      return this.myJwtService.createToken(JwtTokenType.ACCESS, userId);
    } catch {
      throw new RefreshTokenExpiredException(cookie);
    }
  }
}
