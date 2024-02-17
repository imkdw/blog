import { ApiProperty } from '@nestjs/swagger';
import { users } from '@prisma/client';

import BaseEntity from '../../../common/domain/base.entity';

/**
 * 회원가입 경로
 */
export const UserSignUpChannels = {
  COMMON: '일반',
  OAUTH: '소셜',
} as const;
export type IUserSignUpChannels = (typeof UserSignUpChannels)[keyof typeof UserSignUpChannels];

/**
 * 사용자 권한
 */
export const UserRoles = {
  NORMAL: '일반',
  ADMIN: '관리자',
} as const;
export type IUserRoles = (typeof UserRoles)[keyof typeof UserRoles];

export default class User extends BaseEntity implements users {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @ApiProperty({ description: '회원 아이디', example: 1 })
  readonly id: string;

  @ApiProperty({ description: '이메일', example: 'imkdw@kakao.com' })
  readonly email: string;

  @ApiProperty({ description: '비밀번호', example: 'password1234!' })
  readonly password: string;

  @ApiProperty({ description: '닉네임', example: '닉네임123' })
  readonly nickname: string;

  @ApiProperty({ description: '회원가입 채널 아이디', example: 1, enum: UserSignUpChannels })
  readonly signUpChannelId: number;

  @ApiProperty({ description: '유저 권한 아이디', example: 1 })
  readonly roleId: number;
}
