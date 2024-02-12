import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SignUpUsecase, SignUpUsecaseSymbol } from '../../../application/port/in/usecases/sign-up.usecase';
import { RequestSignUpDto } from '../../../application/dto/request/sign-up.dto';
import { ApiTags } from '@nestjs/swagger';
import * as Swagger from '../../../docs/auth-common.swagger';
import { SignUpCommand } from '../../../application/port/in/commands/auth-common.command';

@ApiTags('[Auth] 일반 인증 API')
@Controller({ path: 'auth/common', version: '1' })
export default class AuthCommonController {
  constructor(@Inject(SignUpUsecaseSymbol) private readonly signUpUsecase: SignUpUsecase) {}

  @Swagger.signUp('일반 회원가입')
  @Post('sign-up')
  commonSignUp(@Body() dto: RequestSignUpDto) {
    const { email, nickname, password } = dto;
    const signUpCommand = new SignUpCommand(email, nickname, password);
    this.signUpUsecase.commonSignUp(signUpCommand);
  }
}
