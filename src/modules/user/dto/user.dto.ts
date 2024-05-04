import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsUUID, IsUrl } from 'class-validator';

import BaseEntity from '../../../common/domain/base.entity';
import IsNickname from '../../../common/decorators/validation/is-nickname.decorator';

export default class UserDto extends BaseEntity {
  @ApiProperty({ description: '유저의 고유 아이디', example: 'UUID' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: '유저의 이메일', example: 'imkdw@kakao.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '유저의 비밀번호', example: 'hash', required: false })
  @IsOptional()
  password?: string | null;

  @ApiProperty({ description: '유저의 닉네임', example: 'nickname', minLength: 2, maxLength: 12 })
  @IsNickname()
  nickname: string;

  @ApiProperty({ description: '유저의 프로필 이미지', example: 'https://example.com/profile.jpg' })
  @IsUrl()
  profile: string;

  @ApiProperty({ description: '유저의 가입 채널 아이디', example: 1 })
  @IsNumber()
  signupChannelId: number;

  @ApiProperty({ description: '유저의 권한 아이디', example: 1 })
  @IsNumber()
  roleId: number;

  @ApiProperty({ description: '유저의 소셜 인증 제공자 아이디', example: 1, required: false })
  @IsOptional()
  oAuthProviderId: number | null;
}
