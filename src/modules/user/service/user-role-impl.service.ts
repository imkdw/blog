import { Inject, Injectable } from '@nestjs/common';
import { UserRoleService } from '../types/service/user-role.service';
import UserRole from '../domain/user-role.entity';
import { FindOption } from '../../../common/types/interfaces/find-option.interface';
import { UserRoleRepository, UserRoleRepositorySymbol } from '../types/repository/user-role.repository';

@Injectable()
export default class UserRoleServiceImpl implements UserRoleService {
  constructor(@Inject(UserRoleRepositorySymbol) private readonly userRoleRepository: UserRoleRepository) {}

  async findByName(name: string, option: FindOption): Promise<UserRole | null> {
    const userRole = await this.userRoleRepository.findByName(name, option);
    return userRole;
  }

  async findById(id: number, option: FindOption): Promise<UserRole | null> {
    const userRole = await this.userRoleRepository.findById(id, option);
    return userRole;
  }
}
