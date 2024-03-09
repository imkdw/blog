import { Injectable } from '@nestjs/common';
import { IUserRoleRepository } from '../interfaces/user-role.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import UserRole from '../domain/entities/user-role.entity';

@Injectable()
export default class UserRoleRepository implements IUserRoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByName(name: string, option: FindOption): Promise<UserRole | null> {
    const userRole = await this.prisma.userRole.findUnique({
      where: { name, ...(option.includeDeleted ? {} : { deleteAt: null }) },
    });
    return userRole;
  }

  async findById(id: number, option: FindOption): Promise<UserRole | null> {
    const userRole = await this.prisma.userRole.findUnique({
      where: { id, ...(option.includeDeleted ? {} : { deleteAt: null }) },
    });
    return userRole;
  }
}
