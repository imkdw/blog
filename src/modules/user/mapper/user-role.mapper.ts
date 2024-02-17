import { usersRole } from '@prisma/client';
import UserRole from '../domain/user-role.entity';
import { IUserRoles } from '../domain/user.entity';

// eslint-disable-next-line import/prefer-default-export
export function toUserRole(_role: usersRole): UserRole {
  return {
    ..._role,
    name: _role.name as IUserRoles,
  };
}
