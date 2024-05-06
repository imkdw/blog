import { Injectable } from '@nestjs/common';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import { TX } from '../../../common/types/prisma';
import User from '../entities/user.entity';
import { applyOption } from '../../../common/utils/repository';

@Injectable()
export default class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: User, tx: TX = this.prisma): Promise<User> {
    const row = await tx.users.create({
      data: {
        email: user.email,
        id: user.id,
        nickname: user.nickname,
        profile: user.profile,
        oAuthProviderId: user.oAuthProviderId,
        password: user.password,
        roleId: user.roleId,
        signupChannelId: user.signupChannelId,
      },
    });

    return new User(row);
  }

  async update(userId: string, user: Partial<User>, tx: TX = this.prisma): Promise<void> {
    await tx.users.update({ where: { id: userId }, data: user });
  }

  async findById(id: string, option?: FindOption): Promise<User | null> {
    const row = await this.prisma.users.findUnique({
      where: applyOption({ id }, option),
    });

    return row ? new User(row) : null;
  }

  async findByEmail(email: string, option?: FindOption): Promise<User | null> {
    const row = await this.prisma.users.findFirst({
      where: { email, ...(option?.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? new User(row) : null;
  }

  async findByNickname(nickname: string, option?: FindOption): Promise<User | null> {
    const row = await this.prisma.users.findFirst({
      where: { nickname, ...(option?.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? new User(row) : null;
  }
}
