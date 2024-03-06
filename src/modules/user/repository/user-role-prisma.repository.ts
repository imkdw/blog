import { Injectable } from '@nestjs/common';
import { UserRoleRepository } from '../types/repository/user-role.repository';
import UserRole from '../domain/user-role.entity';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { toUserRole } from '../mapper/user-role.mapper';
import { FindOption } from '../../../common/types/interfaces/find-option.interface';

@Injectable()
export default class UserRolePrismaRepository implements UserRoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByName(name: string, option: FindOption): Promise<UserRole | null> {
    const row = await this.prisma.usersRole.findUnique({
      where: {
        name,
        ...(option.includeDeleted ? {} : { deleteAt: null }),
      },
    });

    return row ? toUserRole(row) : null;
  }

  async findById(id: number, option: FindOption): Promise<UserRole | null> {
    const row = await this.prisma.usersRole.findUnique({
      where: {
        id,
        ...(option.includeDeleted ? {} : { deleteAt: null }),
      },
    });

    return row ? toUserRole(row) : null;
  }
}
