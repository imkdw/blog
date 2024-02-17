import { SetMetadata } from '@nestjs/common';
import { IRoleType } from '../types/enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: IRoleType[]) => SetMetadata(ROLES_KEY, roles);
