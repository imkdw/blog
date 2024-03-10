import { Body, Controller, Inject, Post } from '@nestjs/common';
import * as Swagger from '../docs/auth.swagger';
import { AuthEmailServiceKey, IAuthEmailService } from '../interfaces/auth-email.interface';
import { RequestSendVerifyCodeDto, RequestVerifyCodeValidationDto } from '../dto/request/auth-email.dto';
import { ResponseSendVerifyCodeDto, ResponseVerifyCodeValidationDto } from '../dto/response/auth-email.dto';
import { Public } from '../../../common/decorators/public.decorator';

@Controller({ path: 'auth/email', version: '1' })
export default class AuthEmailController {
  constructor(@Inject(AuthEmailServiceKey) private readonly authEmailService: IAuthEmailService) {}

  // TODO: 유저가 이메일을 다량 발송하지 못하게 차단필요
  @Swagger.sendVerifyCode('이메일 인증 메일 전송')
  @Public()
  @Post()
  async sendVerifyCode(@Body() dto: RequestSendVerifyCodeDto): Promise<ResponseSendVerifyCodeDto> {
    const verificationId = await this.authEmailService.sendVerifyCode(dto.email);

    return { verificationId };
  }

  @Swagger.verifyCodeValidation('이메일 인증 코드 검증')
  @Public()
  @Post('verify')
  async verifyCodeValidation(@Body() dto: RequestVerifyCodeValidationDto): Promise<ResponseVerifyCodeValidationDto> {
    const isVerified = await this.authEmailService.verifyCodeValidation(dto.verificationId, dto.code);

    return { isVerified };
  }
}
