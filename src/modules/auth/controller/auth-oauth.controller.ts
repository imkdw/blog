import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import * as Swagger from '../docs/auth-oauth.swagger';
import Authorization from '../../../common/decorators/authorization.decorator';
import { Public } from '../../../common/decorators/public.decorator';
import { AuthOAuthService, AuthOAuthServiceSymbol } from '../types/service/auth-oauth.service';
import ReponseOAuthDto from '../types/dto/response/oauth.dto';
import RequestOAuthSignUpDto from '../types/dto/request/oauth-sign-up.dto';
import { CookieService, CookieServiceSymbol } from '../../../common/types/cookie.service';
import { CookieMaxage } from '../../../common/types/enums/cookie-maxage.enum';
import RequestOAuthSignInDto from '../types/dto/request/oauth-sign-in.dto';
import ResponseSignInDto from '../types/dto/response/sign-in.dto';

@Controller({ path: 'auth/oauth', version: '1' })
export default class AuthOAuthController {
  constructor(
    @Inject(AuthOAuthServiceSymbol) private readonly oAuthService: AuthOAuthService,
    @Inject(CookieServiceSymbol) private readonly cookieService: CookieService,
  ) {}

  @Swagger.googleOAuth('구글 OAuth 인증')
  @Public()
  @Get('google')
  async googleOAuth(@Authorization() authorization: string): Promise<ReponseOAuthDto> {
    const result = await this.oAuthService.googleOAuth(authorization);
    return result;
  }

  @Swagger.oAuthSignUp('OAuth 회원가입')
  @Public()
  @Post('sign-up')
  async oAuthSignUp(
    @Body() dto: RequestOAuthSignUpDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseSignInDto> {
    const result = await this.oAuthService.oAuthSignUp(dto);

    this.cookieService.setCookie(res, { key: 'refreshToken', value: result.refreshToken, maxAge: CookieMaxage.DAY_30 });

    return { email: result.email, accessToken: result.accessToken };
  }

  @Swagger.oAuthSignIn('OAuth 로그인')
  @Public()
  @Post('sign-in')
  async oAuthSignIn(
    @Body() dto: RequestOAuthSignInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseSignInDto> {
    const result = await this.oAuthService.oAuthSignIn(dto);

    this.cookieService.setCookie(res, { key: 'refreshToken', value: result.refreshToken, maxAge: CookieMaxage.DAY_30 });

    return { email: result.email, accessToken: result.accessToken };
  }
}
