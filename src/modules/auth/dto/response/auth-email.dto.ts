import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ResponseSendVerifyCodeDto {
  @ApiProperty({ description: '이메일이 발송건에 대한 아이디', example: 1 })
  @IsNumber()
  verificationId: number;
}

export class ResponseVerifyCodeValidationDto {
  @ApiProperty({ description: '이메일 인증 성공 여부', example: true })
  isVerified: boolean;
}
