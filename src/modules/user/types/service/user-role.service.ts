import { FindOption } from '../../../../common/types/interfaces/find-option.interface';
import UserRole from '../../domain/user-role.entity';

export const UserRoleServiceSymbol = Symbol('UserRoleService');
export interface UserRoleService {
  findByName(name: string, option: FindOption): Promise<UserRole | null>;

  findById(id: number, option: FindOption): Promise<UserRole | null>;
}
