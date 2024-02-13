import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Inject, Post } from '@nestjs/common';

import { AuthCommonService, AuthCommonServiceSymbol } from '../types/auth-common.service';
import RequestSignUpDto from '../types/dto/request/sign-up.dto';
import SignUpDto from '../types/dto/internal/sign-up.dto';

@ApiTags('[인증] 일반 인증')
@Controller({ path: 'auth/common', version: '1' })
export default class AuthCommonController {
  constructor(@Inject(AuthCommonServiceSymbol) private readonly authCommonService: AuthCommonService) {}

  @Post('sign-up')
  commonSignUp(@Body() dto: RequestSignUpDto) {
    const { email, nickname, password } = dto;
    const signUpDto = new SignUpDto(email, nickname, password);
    this.authCommonService.commonSignUp(signUpDto);
  }
}
