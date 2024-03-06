import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthCommonService, AuthCommonServiceSymbol } from '../types/service/auth-common.service';
import RequestSignUpDto from '../types/dto/request/common-sign-up.dto';
import * as Swagger from '../docs/auth-common.swagger';
import RequestSignInDto from '../types/dto/request/common-sign-in.dto';
import ResponseSignInDto from '../types/dto/response/sign-in.dto';
import { Public } from '../../../common/decorators/public.decorator';

@ApiTags('[인증] 일반 인증')
@Controller({ path: 'auth/common', version: '1' })
export default class AuthCommonController {
  constructor(@Inject(AuthCommonServiceSymbol) private readonly authCommonService: AuthCommonService) {}

  @Swagger.commonSignUp('회원가입')
  @Public()
  @Post('sign-up')
  async commonSignUp(
    @Body() dto: RequestSignUpDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseSignInDto> {
    const { email, nickname, password } = dto;
    const { accessToken, refreshToken, user } = await this.authCommonService.commonSignUp({
      email,
      nickname,
      password,
    });

    res.cookie('refreshToken', refreshToken, { httpOnly: true });

    return {
      accessToken,
      email: user.email,
      nickname: user.nickname,
      profile: user.profile,
      role: user.role,
    };
  }

  @Swagger.commonSignIn('로그인')
  @Public()
  @Post('sign-in')
  async commonSignIn(
    @Body() dto: RequestSignInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseSignInDto> {
    const { email, password } = dto;
    const { accessToken, refreshToken, user } = await this.authCommonService.commonSignIn({ email, password });

    res.cookie('refreshToken', refreshToken, { httpOnly: true });

    return {
      accessToken,
      email: user.email,
      nickname: user.nickname,
      profile: user.profile,
      role: user.role,
    };
  }
}
