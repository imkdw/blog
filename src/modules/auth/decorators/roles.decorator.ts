import { SetMetadata } from '@nestjs/common';
import { IUserRoles } from '../../user/enums/user-role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: IUserRoles[]) => SetMetadata(ROLES_KEY, roles);
