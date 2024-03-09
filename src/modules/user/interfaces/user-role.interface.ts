import { FindOption } from '../../../common/interfaces/find-option.interface';
import UserRole from '../domain/entities/user-role.entity';

export const UserRoleServiceKey = Symbol('UserRoleService');
export interface IUserRoleService {
  findByName(name: string, option: FindOption): Promise<UserRole | null>;
}

export const UserRoleRepositoryKey = Symbol('UserRoleRepository');
export interface IUserRoleRepository {
  findByName(name: string, option: FindOption): Promise<UserRole | null>;
}
