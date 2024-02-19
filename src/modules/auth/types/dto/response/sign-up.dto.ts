import { IsEmail, IsString } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

import User from '../../../../user/domain/user.entity';

export default class ResponseSignUpDto extends PickType(User, ['email']) {
  @ApiProperty({ description: '가입한 사용자의 이메일 주소', example: 'imkdw@kakao.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '엑세스 토큰' })
  @IsString()
  accessToken: string;
}
