import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthCommonService, AuthCommonServiceSymbol } from '../types/auth-common.service';
import RequestSignUpDto from '../types/dto/request/sign-up.dto';
import * as Swagger from '../docs/auth-common.swagger';
import RequestSignInDto from '../types/dto/request/sign-in.dto';
import ResponseCommonSignUpDto from '../types/dto/response/sign-up.dto';
import ResponseCommonSignInDto from '../types/dto/response/sign-in.dto';

@ApiTags('[인증] 일반 인증')
@Controller({ path: 'auth/common', version: '1' })
export default class AuthCommonController {
  constructor(@Inject(AuthCommonServiceSymbol) private readonly authCommonService: AuthCommonService) {}

  @Swagger.commonSignUp('회원가입')
  @Post('sign-up')
  commonSignUp(@Body() dto: RequestSignUpDto, @Res({ passthrough: true }) res: Response): ResponseCommonSignUpDto {
    const { email, nickname, password } = dto;
    const signUpResult = this.authCommonService.commonSignUp({ email, nickname, password });
    res.cookie('refreshToken', signUpResult.refreshToken, { httpOnly: true });
    return { email: signUpResult.email, accessToken: signUpResult.accessToken };
  }

  @Swagger.commonSignIn('로그인')
  @Post('sign-in')
  commonSignIn(@Body() dto: RequestSignInDto, @Res({ passthrough: true }) res: Response): ResponseCommonSignInDto {
    const { email, password } = dto;
    const signInResult = this.authCommonService.commonSignIn({ email, password });
    res.cookie('refreshToken', signInResult.refreshToken, { httpOnly: true });
    return { email: signInResult.email, accessToken: signInResult.accessToken };
  }
}
