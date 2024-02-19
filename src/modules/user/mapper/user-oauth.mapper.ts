import { usersOAuth } from '@prisma/client';
import UserOAuth from '../domain/user-oauth.entity';

// eslint-disable-next-line import/prefer-default-export
export function toUserOAuth(_userOAuth: usersOAuth): UserOAuth {
  return _userOAuth;
}
