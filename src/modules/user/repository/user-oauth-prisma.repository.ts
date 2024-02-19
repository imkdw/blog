import { Injectable } from '@nestjs/common';
import { UserOAuthRepository } from '../types/repository/user-oauth.repository';
import UserOAuth from '../domain/user-oauth.entity';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { toUserOAuth } from '../mapper/user-oauth.mapper';
import { TX } from '../../../common/types/prisma';

@Injectable()
export default class UserOAuthPrismaRepository implements UserOAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(userId: string): Promise<UserOAuth | null> {
    const row = await this.prisma.usersOAuth.findUnique({ where: { userId, deleteAt: null } });
    return row ? toUserOAuth(row) : null;
  }

  async save(userOAuth: UserOAuth, tx?: TX): Promise<UserOAuth> {
    const prisma = tx || this.prisma;
    const row = await prisma.usersOAuth.create({ data: userOAuth });
    return toUserOAuth(row);
  }
}
