import { users } from '@prisma/client';
import BaseEntity from '../../../../common/domain/base.entity';

export default class User extends BaseEntity implements users {
  constructor(user: User) {
    super();
    Object.assign(this, user);
  }

  readonly id: string;

  email: string;

  password: string | null;

  nickname: string;

  profile: string;

  signupChannelId: number;

  roleId: number;

  oAuthProviderId: number | null;
}
