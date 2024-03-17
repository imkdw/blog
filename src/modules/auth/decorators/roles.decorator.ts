import { SetMetadata } from '@nestjs/common';
import { IUserRoles } from '../../user/domain/entities/user-role.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: IUserRoles[]) => SetMetadata(ROLES_KEY, roles);
