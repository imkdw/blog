import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import IsPassword from '../../../../common/decorators/validation/is-password.decorator';

// eslint-disable-next-line import/prefer-default-export
export class RequestCommonSigninDto {
  @ApiProperty({ description: '로그인한 이메일 주소', example: 'imkdw@kakao.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '로그인한 비밀번호', example: 'password1234!' })
  @IsPassword()
  password: string;
}
