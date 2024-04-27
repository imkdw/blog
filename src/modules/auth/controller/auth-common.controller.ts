import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthCommonServiceKey, IAuthCommonService } from '../interfaces/auth-common.interface';
import * as Swagger from '../docs/auth-common.swagger';
import { RequestCommonSigninDto } from '../dto/request/auth-common.dto';
import { ResponseAuthResultDto } from '../dto/response/auth.dto';
import { Public } from '../decorators/public.decorator';
import { CookieServiceKey, ICookieService } from '../../../common/interfaces/cookie.interface';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../constants/auth.constants';
import { CookieMaxage } from '../../../common/enums/cookie-maxage.enum';
import { toResponseAuthResultDto } from '../mapper/auth.mapper';

@ApiTags('[인증] 일반')
@Controller({ path: 'auth/common', version: '1' })
export default class AuthCommonController {
  constructor(
    @Inject(AuthCommonServiceKey) private readonly authCommonService: IAuthCommonService,
    @Inject(CookieServiceKey) private readonly cookieService: ICookieService,
  ) {}

  @Swagger.signin('일반 로그인')
  @Public()
  @Post('signin')
  async signin(
    @Body() dto: RequestCommonSigninDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseAuthResultDto> {
    const authResult = await this.authCommonService.signin(dto);

    this.cookieService.setCookie(REFRESH_TOKEN_KEY, authResult.refreshToken, CookieMaxage.DAY_30, res);
    this.cookieService.setCookie(ACCESS_TOKEN_KEY, authResult.accessToken, CookieMaxage.HOUR_1, res);

    return toResponseAuthResultDto(authResult);
  }
}
