import { users } from '@prisma/client';

export interface CreateUserDto extends Pick<users, 'email' | 'password' | 'nickname' | 'roleId' | 'signUpChannelId'> {
  profile?: string;
}
