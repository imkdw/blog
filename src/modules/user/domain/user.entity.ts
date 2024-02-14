import { Users } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import BaseEntity from '../../../common/domain/base.entity';

/**
 * 회원가입 경로
 * - COMMON : 일반 회원가입
 * - OAUTH : 소셜 로그인 회원가입
 */
export const UserSignUpChannel = {
  COMMON: 'common',
  OAUTH: 'oauth',
} as const;
export type IUserSignUpChannel = (typeof UserSignUpChannel)[keyof typeof UserSignUpChannel];

export default class User extends BaseEntity implements Users {
  constructor(email: string, password: string, nickname: string, signUpChannelId: number) {
    super();
    this.email = email;
    this.password = password;
    this.nickname = nickname;
    this.signUpChannelId = signUpChannelId;
  }

  @ApiProperty({ description: '이메일', example: 'imkdw@kakao.com' })
  readonly email: string;

  @ApiProperty({ description: '비밀번호', example: 'password1234!' })
  readonly password: string;

  @ApiProperty({ description: '닉네임', example: '닉네임123' })
  readonly nickname: string;

  @ApiProperty({ description: '회원가입 채널 아이디', example: 1, enum: UserSignUpChannel })
  readonly signUpChannelId: number;
}
