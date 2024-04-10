import { Inject, Injectable } from '@nestjs/common';
import { IUserRoleRepository, IUserRoleService, UserRoleRepositoryKey } from '../interfaces/user-role.interface';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import UserRole from '../domain/user-role/user-role.domain';

@Injectable()
export default class UserRoleService implements IUserRoleService {
  constructor(@Inject(UserRoleRepositoryKey) private readonly userRoleRepository: IUserRoleRepository) {}

  async findOne(dto: Partial<UserRole>, option?: FindOption): Promise<UserRole | null> {
    return this.userRoleRepository.findOne(dto, option);
  }
}
