import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import * as Swagger from '../docs/oauth.swagger';
import Authorization from '../../../common/decorators/authorization.decorator';
import { Public } from '../../../common/decorators/public.decorator';
import { AuthOAuthService, AuthOAuthServiceSymbol } from '../types/service/auth-oauth.service';
import ReponseOAuthDto from '../types/dto/response/oauth.dto';
import RequestOAuthSignUpDto from '../types/dto/request/oauth-sign-up.dto';
import { CookieService, CookieServiceSymbol } from '../../../common/types/cookie.service';
import { CookieMaxage } from '../../../common/types/enums/cookie-maxage.enum';
import RequestOAuthSignInDto from '../types/dto/request/oauth-sign-in.dto';
import ResponseSignInDto from '../types/dto/response/sign-in.dto';
import RequestKakaoOAuthDto from '../types/dto/request/kakao-oauth.dto';
import RequestGithubOAuthDto from '../types/dto/request/github-oauth.dto';

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

  @Swagger.kakaoOAuth('카카오 OAuth 인증')
  @Public()
  @Post('kakao')
  async kakaoOAuth(@Body() dto: RequestKakaoOAuthDto): Promise<ReponseOAuthDto> {
    const { code, redirectUri } = dto;
    const result = await this.oAuthService.kakaoOAuth({ code, redirectUri });
    return result;
  }

  @Swagger.githubOAuth('깃허브 OAuth 인증')
  @Public()
  @Post('github')
  async githubOAuth(@Body() dto: RequestGithubOAuthDto): Promise<ReponseOAuthDto> {
    const { code, redirectUri } = dto;
    const result = await this.oAuthService.githubOAuth({ code, redirectUri });
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

    return {
      email: result.email,
      accessToken: result.accessToken,
      nickname: result.nickname,
      profile: result.profile,
      role: result.role,
    };
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

    return {
      email: result.email,
      accessToken: result.accessToken,
      nickname: result.nickname,
      profile: result.profile,
      role: result.role,
    };
  }
}
