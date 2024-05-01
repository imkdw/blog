import userRoleSeed from '../../../../../prisma/seed/user/user-role.seed';
import { FindOption } from '../../../../common/interfaces/find-option.interface';
import UserRoleEntity from '../../entities/user-role/user-role.entity';
import { IUserRoleService } from '../../interfaces/user-role.interface';

export default class UserRoleServiceStub implements IUserRoleService {
  private memory: UserRoleEntity[] = [];

  async findById(id: number, option?: FindOption): Promise<UserRoleEntity | null> {
    const row = this.memory.find((userRole) => userRole.id === id);
    if (!row) return null;
    if (option?.includeDeleted && row.deleteAt) return null;
    return row;
  }

  async findByName(name: string, option?: FindOption): Promise<UserRoleEntity | null> {
    const row = this.memory.find((userRole) => userRole.name === name);
    if (!row) return null;
    if (option?.includeDeleted && row.deleteAt) return null;
    return row;
  }

  init() {
    userRoleSeed.map((role, index) =>
      this.memory.push(
        new UserRoleEntity({
          id: index + 1,
          name: role.name,
        }),
      ),
    );
  }

  reset() {
    this.memory = [];
  }
}
