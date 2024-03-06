import { users } from '@prisma/client';

import BaseEntity from '../../../common/domain/base.entity';

/**
 * 회원가입 경로
 */
export const UserSignUpChannels = {
  COMMON: 'common',
  OAUTH: 'oauth',
} as const;
export type IUserSignUpChannels = (typeof UserSignUpChannels)[keyof typeof UserSignUpChannels];

/**
 * 사용자 권한
 */
export const UserRoles = {
  NORMAL: 'normal',
  ADMIN: 'admin',
} as const;
export type IUserRoles = (typeof UserRoles)[keyof typeof UserRoles];

export default class User extends BaseEntity implements users {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  readonly id: string;

  readonly email: string;

  readonly password: string;

  readonly profile: string;

  readonly nickname: string;

  readonly signUpChannelId: number;

  readonly roleId: number;
}
