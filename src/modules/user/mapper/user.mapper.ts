import { users } from '@prisma/client';
import User from '../domain/user.entity';

// eslint-disable-next-line import/prefer-default-export
export function toUser(_user: users): User {
  return _user;
}
