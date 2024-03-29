import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

import { IOAuthService, OAuthServiceKey } from '../interfaces/oauth.interface';
import * as Swagger from '../docs/oauth.swagger';
import { Public } from '../decorators/public.decorator';
import Authorization from '../decorators/authorization.decorator';
import { CookieServiceKey, ICookieService } from '../../../common/interfaces/cookie.interface';
import { ResponseOAuthDto } from '../dto/response/oauth.dto';
import {
  RequestGithubOAuthDto,
  RequestKakaoOAuthDto,
  RequestOAuthSigninDto,
  RequestOAuthSignupDto,
} from '../dto/request/oauth.dto';
import { ResponseAuthResultDto } from '../dto/response/auth.dto';
import { REFRESH_TOKEN_KEY } from '../constants/auth.constants';
import { CookieMaxage } from '../../../common/enums/cookie-maxage.enum';
import { AuthMapperKey, IAuthMapper } from '../interfaces/auth.interface';

@ApiTags('[인증] OAuth')
@Controller({ path: 'auth/oauth', version: '1' })
export default class OAuthController {
  constructor(
    @Inject(OAuthServiceKey) private readonly oAuthService: IOAuthService,
    @Inject(CookieServiceKey) private readonly cookieService: ICookieService,
    @Inject(AuthMapperKey) private readonly authMapper: IAuthMapper,
  ) {}

  @Swagger.googleOAuth('구글 OAuth 인증')
  @Public()
  @Get('google')
  async googleOAuth(@Authorization() authorization: string): Promise<ResponseOAuthDto> {
    const result = await this.oAuthService.googleOAuth(authorization);
    return result;
  }

  @Swagger.kakaoOAuth('카카오 OAuth 인증')
  @Public()
  @Post('kakao')
  async kakaoOAuth(@Body() dto: RequestKakaoOAuthDto): Promise<ResponseOAuthDto> {
    const result = await this.oAuthService.kakaoOAuth(dto.code, dto.redirectUri);
    return result;
  }

  @Swagger.githubOAuth('깃허브 OAuth 인증')
  @Public()
  @Post('github')
  async githubOAuth(@Body() dto: RequestGithubOAuthDto): Promise<ResponseOAuthDto> {
    const result = await this.oAuthService.githubOAuth(dto.code, dto.redirectUri);
    return result;
  }

  @Swagger.oAuthSignin('OAuth 회원가입')
  @Public()
  @Post('signup')
  async oAuthSignUp(
    @Body() dto: RequestOAuthSignupDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseAuthResultDto> {
    const authResult = await this.oAuthService.oAuthSignUp(dto);

    this.cookieService.setCookie(REFRESH_TOKEN_KEY, authResult.refreshToken, CookieMaxage.DAY_30, res);

    return this.authMapper.toResponseAuthResultDto(authResult);
  }

  @Swagger.oAuthSignin('OAuth 로그인')
  @Public()
  @Post('signin')
  async oAuthSignIn(
    @Body() dto: RequestOAuthSigninDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseAuthResultDto> {
    const authResult = await this.oAuthService.oAuthSignIn(dto);

    this.cookieService.setCookie(REFRESH_TOKEN_KEY, authResult.refreshToken, CookieMaxage.DAY_30, res);

    return this.authMapper.toResponseAuthResultDto(authResult);
  }
}
