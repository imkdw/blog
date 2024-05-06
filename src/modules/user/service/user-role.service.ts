import { Injectable } from '@nestjs/common';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import UserRole from '../entities/user-role/user-role.entity';
import UserRoleRepository from '../repository/user-role.repository';

@Injectable()
export default class UserRoleService {
  constructor(private readonly userRoleRepository: UserRoleRepository) {}

  async findById(id: number, option?: FindOption): Promise<UserRole | null> {
    const userRole = await this.userRoleRepository.findById(id, option);
    return userRole;
  }

  async findByName(name: string, option?: FindOption): Promise<UserRole | null> {
    const userRole = await this.userRoleRepository.findByName(name, option);
    return userRole;
  }
}
