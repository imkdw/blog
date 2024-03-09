import { userSignupChannel } from '@prisma/client';
import BaseEntity from '../../../../common/domain/base.entity';

export const UserSignupChannels = {
  COMMON: 'COMMON',
  OAUTH: 'OAUTH',
} as const;
export type IUserSignupChannels = (typeof UserSignupChannels)[keyof typeof UserSignupChannels];

export default class UserSignupChannel extends BaseEntity implements userSignupChannel {
  constructor(userSingupChannel: UserSignupChannel) {
    super();
    Object.assign(this, userSingupChannel);
  }

  readonly id: number;

  readonly name: string;
}
