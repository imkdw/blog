import { FindOption } from '../../../common/interfaces/find-option.interface';
import UserRole from '../domain/user-role/user-role.domain';

export const UserRoleServiceKey = Symbol('UserRoleService');
export interface IUserRoleService {
  findOne(dto: Partial<UserRole>, option?: FindOption): Promise<UserRole | null>;
}

export const UserRoleRepositoryKey = Symbol('UserRoleRepository');
export interface IUserRoleRepository {
  findOne(dto: Partial<UserRole>, option?: FindOption): Promise<UserRole | null>;
}
