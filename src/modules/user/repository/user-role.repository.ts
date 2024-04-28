import { Injectable } from '@nestjs/common';
import { IUserRoleRepository } from '../interfaces/user-role.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import UserRole from '../domain/user-role/user-role.domain';

@Injectable()
export default class UserRoleRepository implements IUserRoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number, option?: FindOption): Promise<UserRole | null> {
    const row = await this.prisma.userRole.findFirst({
      where: { id, ...(option.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? new UserRole(row) : null;
  }

  async findByName(name: string, option?: FindOption): Promise<UserRole> {
    const row = await this.prisma.userRole.findFirst({
      where: { name, ...(option.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? new UserRole(row) : null;
  }
}
