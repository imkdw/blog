import { FindOption } from '../../../../common/interfaces/find-option.interface';
import UserRole from '../../domain/user-role/user-role.domain';
import { IUserRoleService } from '../../interfaces/user-role.interface';

export default class UserRoleServiceStub implements IUserRoleService {
  private memory: UserRole[] = [];

  async findById(id: number, option?: FindOption): Promise<UserRole | null> {
    const row = this.memory.find((userRole) => userRole.id === id);
    if (!row) return null;
    if (option?.includeDeleted && row.deleteAt) return null;
    return row;
  }

  async findByName(name: string, option?: FindOption): Promise<UserRole | null> {
    const row = this.memory.find((userRole) => userRole.name === name);
    if (!row) return null;
    if (option?.includeDeleted && row.deleteAt) return null;
    return row;
  }

  protected reset() {
    this.memory = [];
  }
}
