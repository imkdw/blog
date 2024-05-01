import { FindOption } from '../../../common/interfaces/find-option.interface';
import UserRoleEntity from '../entities/user-role/user-role.entity';

export const UserRoleServiceKey = Symbol('UserRoleService');
export interface IUserRoleService {
  findById(id: number, option?: FindOption): Promise<UserRoleEntity | null>;
  findByName(name: string, option?: FindOption): Promise<UserRoleEntity | null>;
}

export const UserRoleRepositoryKey = Symbol('UserRoleRepository');
export interface IUserRoleRepository {
  findById(id: number, option?: FindOption): Promise<UserRoleEntity | null>;
  findByName(name: string, option?: FindOption): Promise<UserRoleEntity | null>;
}
