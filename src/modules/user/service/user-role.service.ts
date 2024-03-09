import { Inject, Injectable } from '@nestjs/common';
import { IUserRoleRepository, IUserRoleService, UserRoleRepositoryKey } from '../interfaces/user-role.interface';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import UserRole from '../domain/entities/user-role.entity';

@Injectable()
export default class UserRoleService implements IUserRoleService {
  constructor(@Inject(UserRoleRepositoryKey) private readonly userRoleRepository: IUserRoleRepository) {}

  async findByName(name: string, option: FindOption): Promise<UserRole | null> {
    const userRole = await this.userRoleRepository.findByName(name, option);
    return userRole;
  }

  async findById(id: number, option: FindOption): Promise<UserRole | null> {
    const userRole = await this.userRoleRepository.findById(id, option);
    return userRole;
  }
}
