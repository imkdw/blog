import { IsEmail, IsString, IsUrl } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

import User from '../../../../user/domain/user.entity';
import IsNickname from '../../../../../common/decorators/is-nickname.decorator';

export default class ResponseSignInDto extends PickType(User, ['email']) {
  @ApiProperty({ description: '가입한 사용자의 이메일 주소', example: 'imkdw@kakao.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '가입한 사용자의 닉네임', example: 'imkdwdev' })
  @IsNickname()
  nickname: string;

  @ApiProperty({
    description: '가입한 사용자의 프로필사진',
    example: 'https://avatars.profile.com/u/12345678?v=4',
  })
  @IsUrl()
  profile: string;

  @ApiProperty({ description: '엑세스 토큰' })
  @IsString()
  accessToken: string;
}
