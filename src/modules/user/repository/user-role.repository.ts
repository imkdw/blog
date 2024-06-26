import { Injectable } from '@nestjs/common';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import UserRole from '../entities/user-role/user-role.entity';

@Injectable()
export default class UserRoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number, option?: FindOption): Promise<UserRole | null> {
    const row = await this.prisma.userRole.findFirst({
      where: { id, ...(option?.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? new UserRole(row) : null;
  }

  async findByName(name: string, option?: FindOption): Promise<UserRole> {
    const row = await this.prisma.userRole.findFirst({
      where: { name, ...(option?.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? new UserRole(row) : null;
  }
}
