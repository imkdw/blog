import { users } from '@prisma/client';
import { IUserRoles } from '../../../user/domain/entities/user-role.entity';

export interface AuthResult extends Pick<users, 'email' | 'nickname' | 'profile'> {
  role: IUserRoles;
  accessToken: string;
  refreshToken: string;
}
