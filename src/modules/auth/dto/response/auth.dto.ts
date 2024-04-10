import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUrl } from 'class-validator';
import IsNickname from '../../../../common/decorators/validation/is-nickname.decorator';
import { UserRoles } from '../../../user/enums/user-role.enum';

// eslint-disable-next-line import/prefer-default-export
export class ResponseAuthResultDto {
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

  @ApiProperty({ description: '권한', example: UserRoles.NORMAL })
  @IsString()
  role: string;

  @ApiProperty({ description: '엑세스 토큰' })
  @IsString()
  accessToken: string;
}

export class ResponseRefreshTokenDto {
  @ApiProperty({ description: '토큰 갱신 성공여부' })
  isSuccess: boolean;
}
