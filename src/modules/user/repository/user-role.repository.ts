import { Inject, Injectable } from '@nestjs/common';
import { IUserRoleRepository } from '../interfaces/user-role.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import UserRole from '../domain/entities/user-role.entity';
import { IUserMapper, UserMapperKey } from '../interfaces/user.interface';

@Injectable()
export default class UserRoleRepository implements IUserRoleRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(UserMapperKey) private readonly userMapper: IUserMapper,
  ) {}

  async findByName(name: string, option: FindOption): Promise<UserRole | null> {
    const userRole = await this.prisma.userRole.findUnique({
      where: { name, ...(option.includeDeleted ? {} : { deleteAt: null }) },
    });
    return userRole ? this.userMapper.toUserRole(userRole) : null;
  }

  async findById(id: number, option: FindOption): Promise<UserRole | null> {
    const userRole = await this.prisma.userRole.findUnique({
      where: { id, ...(option.includeDeleted ? {} : { deleteAt: null }) },
    });
    return userRole ? this.userMapper.toUserRole(userRole) : null;
  }
}
