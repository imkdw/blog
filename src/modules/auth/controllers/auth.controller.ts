import { Controller, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

import * as Swagger from '../docs/auth.swagger';
import Cookie from '../decorators/cookie.decorator';
import { AuthServiceKey, IAuthService } from '../interfaces/auth.interface';
import { Public } from '../decorators/public.decorator';
import { CookieServiceKey, ICookieService } from '../../../common/interfaces/cookie.interface';
import { ACCESS_TOKEN_KEY } from '../constants/auth.constants';
import { CookieMaxage } from '../../../common/enums/cookie-maxage.enum';
import { ResponseRefreshTokenDto } from '../dto/response/auth.dto';

@ApiTags('[인증] 공통')
@Controller({ path: 'auth', version: '1' })
export default class AuthController {
  constructor(
    @Inject(AuthServiceKey) private readonly authService: IAuthService,
    @Inject(CookieServiceKey) private readonly cookieService: ICookieService,
  ) {}

  @Swagger.refreshToken('토큰 갱신')
  @Public()
  @Post('/refresh')
  refresh(@Cookie() cookie: string, @Res({ passthrough: true }) res: Response): ResponseRefreshTokenDto {
    const accessToken = this.authService.refreshToken(cookie);
    this.cookieService.setCookie(ACCESS_TOKEN_KEY, accessToken, CookieMaxage.HOUR_1, res);
    return { isSuccess: true };
  }
}
