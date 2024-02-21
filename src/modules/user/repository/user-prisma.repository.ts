import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { UserRepository } from '../types/repository/user.repository';
import User from '../domain/user.entity';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { toUser } from '../mapper/user.mapper';
import UserSignUpChannel from '../domain/user-signup-channel.entity';
import { toUserSignUpChannel } from '../mapper/user-signup-channel.mapper';
import UserRole from '../domain/user-role.entity';
import { toUserRole } from '../mapper/user-role.mapper';
import { TX } from '../../../common/types/prisma';

@Injectable()
export default class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User> {
    const row = await this.prisma.users.findUnique({ where: { email, deleteAt: null } });
    return row ? toUser(row) : null;
  }

  async findUserByNickname(nickname: string): Promise<User> {
    const row = await this.prisma.users.findUnique({ where: { nickname, deleteAt: null } });
    return row ? toUser(row) : null;
  }

  async saveUser(user: User, tx?: TX): Promise<User> {
    const prisma = tx || this.prisma;
    const createdUser = await prisma.users.create({ data: user });
    return toUser(createdUser);
  }

  async updateUser(userId: string, data: Prisma.usersUpdateInput, tx?: TX): Promise<User> {
    const prisma = tx || this.prisma;
    const updatedUser = await prisma.users.update({ where: { id: userId }, data });
    return toUser(updatedUser);
  }

  async findUserSignUpChannelByName(name: string, tx?: TX): Promise<UserSignUpChannel> {
    const prisma = tx || this.prisma;
    const row = await prisma.usersSignUpChannel.findUnique({ where: { name, deleteAt: null } });
    return row ? toUserSignUpChannel(row) : null;
  }

  async findUserById(userId: string): Promise<User> {
    const row = await this.prisma.users.findUnique({ where: { id: userId, deleteAt: null } });
    return row ? toUser(row) : null;
  }

  async findUserRoleByName(name: string, tx?: TX): Promise<UserRole | null> {
    const prisma = tx || this.prisma;
    const row = await prisma.usersRole.findUnique({ where: { name, deleteAt: null } });
    return row ? toUserRole(row) : null;
  }

  async findUserRoleById(roleId: number): Promise<UserRole | null> {
    const row = await this.prisma.usersRole.findUnique({ where: { id: roleId, deleteAt: null } });
    return row ? toUserRole(row) : null;
  }
}
