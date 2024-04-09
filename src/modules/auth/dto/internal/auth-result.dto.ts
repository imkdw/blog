import { users } from '@prisma/client';

export interface AuthResult extends Pick<users, 'email' | 'nickname' | 'profile'> {
  role: string;
  accessToken: string;
  refreshToken: string;
}
