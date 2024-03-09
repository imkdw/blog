import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import IsPassword from '../../../../common/decorators/validation/is-password.decorator';
import IsNickname from '../../../../common/decorators/validation/is-nickname.decorator';

export class RequestCommonSignupDto {
  @ApiProperty({ description: '회원가입한 이메일 주소', example: 'imkdw@kakao.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '회원가입한 비밀번호', example: 'password1234!' })
  @IsPassword()
  password: string;

  @ApiProperty({ description: '회원가입한 닉네임', example: '닉네임123' })
  @IsNickname()
  nickname: string;
}

export class RequestCommonSigninDto {
  @ApiProperty({ description: '로그인한 이메일 주소', example: 'imkdw@kakao.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '로그인한 비밀번호', example: 'password1234!' })
  @IsPassword()
  password: string;
}
