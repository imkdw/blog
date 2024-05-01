import userRoleSeed from '../../../../../prisma/seed/user/user-role.seed';
import { FindOption } from '../../../../common/interfaces/find-option.interface';
import UserRoleEntity from '../../entities/user-role/user-role.entity';
import { IUserRoleRepository } from '../../interfaces/user-role.interface';

export default class UserRoleRepositoryStub implements IUserRoleRepository {
  private memory: UserRoleEntity[] = [];

  async findById(id: number, option?: FindOption): Promise<UserRoleEntity | null> {
    const userRole = this.memory.find((item) => item.id === id);
    if (!userRole) return null;
    if (option?.includeDeleted && userRole?.deleteAt) return null;

    return userRole;
  }

  async findByName(name: string, option?: FindOption): Promise<UserRoleEntity | null> {
    const userRole = this.memory.find((item) => item.name === name);
    if (!userRole) return null;
    if (option?.includeDeleted && userRole?.deleteAt) return null;

    return userRole;
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
