import { FindOption } from '../../../common/interfaces/find-option.interface';
import UserRole from '../domain/user-role/user-role.domain';

export const UserRoleServiceKey = Symbol('UserRoleService');
export interface IUserRoleService {
  findById(id: number, option?: FindOption): Promise<UserRole | null>;
  findByName(name: string, option?: FindOption): Promise<UserRole | null>;
}

export const UserRoleRepositoryKey = Symbol('UserRoleRepository');
export interface IUserRoleRepository {
  findById(id: number, option?: FindOption): Promise<UserRole | null>;
  findByName(name: string, option?: FindOption): Promise<UserRole | null>;
}
