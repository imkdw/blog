import { userRole } from '@prisma/client';
import BaseEntity from '../../../../common/domain/base.entity';
import { ConvertStringToEnumException } from '../../../../common/exceptions/500';

export const UserRoles = {
  NORMAL: 'normal',
  ADMIN: 'admin',
} as const;
export type IUserRoles = (typeof UserRoles)[keyof typeof UserRoles];

export const toIUserRoles = (role: string): IUserRoles => {
  switch (role) {
    case UserRoles.NORMAL:
      return UserRoles.NORMAL;
    case UserRoles.ADMIN:
      return UserRoles.ADMIN;
    default:
      throw new ConvertStringToEnumException(role);
  }
};

export default class UserRole extends BaseEntity implements userRole {
  constructor(_userRole: userRole) {
    super();
    Object.assign(this, _userRole);
  }

  readonly id: number;

  readonly name: string;
}
