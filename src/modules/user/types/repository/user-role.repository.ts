import { FindOption } from '../../../../common/types/interfaces/find-option.interface';
import UserRole from '../../domain/user-role.entity';

export const UserRoleRepositorySymbol = Symbol('UserRoleRepository');

export interface UserRoleRepository {
  findByName(name: string, option: FindOption): Promise<UserRole | null>;

  findById(id: number, option: FindOption): Promise<UserRole | null>;
}
