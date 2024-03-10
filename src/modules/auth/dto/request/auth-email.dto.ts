import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, Length } from 'class-validator';

export class RequestSendVerifyCodeDto {
  @ApiProperty({ description: '인증코드를 발송할 이메일', example: 'test@test.com' })
  @IsEmail()
  email: string;
}

export class RequestVerifyCodeValidationDto {
  @ApiProperty({ description: '이메일 인증코드 발송시 발급된 인증 ID', example: 1 })
  @IsNumber()
  verificationId: number;

  @ApiProperty({ description: '이메일 인증코드', example: '1234', minimum: 6, maximum: 6 })
  @IsString()
  @Length(6, 6)
  code: string;
}
