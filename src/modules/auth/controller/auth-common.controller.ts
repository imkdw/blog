import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthCommonServiceKey, IAuthCommonService } from '../interfaces/auth-common.interface';
import * as Swagger from '../docs/auth-common.swagger';
import { RequestCommonSigninDto, RequestCommonSignupDto } from '../dto/request/auth-common.dto';
import { ResponseAuthResultDto } from '../dto/response/auth.dto';
import { Public } from '../../../common/decorators/public.decorator';
import { AuthMapperKey, IAuthMapper } from '../interfaces/auth.interface';
import { CookieServiceKey, ICookieService } from '../../../common/interfaces/cookie.interface';
import { REFRESH_TOKEN_KEY } from '../constants/auth.constants';
import { CookieMaxage } from '../../../common/enums/cookie-maxage.enum';

@ApiTags('일반 인증')
@Controller({ path: 'auth/common', version: '1' })
export default class AuthCommonController {
  constructor(
    @Inject(AuthCommonServiceKey) private readonly authCommonService: IAuthCommonService,
    @Inject(AuthMapperKey) private readonly authMapper: IAuthMapper,
    @Inject(CookieServiceKey) private readonly cookieService: ICookieService,
  ) {}

  @Swagger.signup('일반 회원가입')
  @Public()
  @Post('signup')
  async signup(
    @Body() dto: RequestCommonSignupDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseAuthResultDto> {
    const authResult = await this.authCommonService.signup(dto);

    this.cookieService.setCookie(REFRESH_TOKEN_KEY, authResult.refreshToken, CookieMaxage.DAY_30, res);

    return this.authMapper.toResponseAuthResultDto(authResult);
  }

  @Swagger.signin('일반 로그인')
  @Public()
  @Post('signin')
  async signin(
    @Body() dto: RequestCommonSigninDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseAuthResultDto> {
    const authResult = await this.authCommonService.signin(dto);

    this.cookieService.setCookie(REFRESH_TOKEN_KEY, authResult.refreshToken, CookieMaxage.DAY_30, res);

    return this.authMapper.toResponseAuthResultDto(authResult);
  }
}
