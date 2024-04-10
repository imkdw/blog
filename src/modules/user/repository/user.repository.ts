import { Injectable } from '@nestjs/common';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import User from '../domain/user/user.domain';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import { TX } from '../../../common/types/prisma';
import { IUserRepository } from '../interfaces/user.interface';
import SignupUser from '../domain/user/singup';

@Injectable()
export default class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: SignupUser, tx: TX): Promise<User> {
    const row = await tx.users.create({ data: user });
    return new User(row);
  }

  async update(userId: string, user: Partial<User>, tx: TX): Promise<void> {
    await tx.users.update({ where: { id: userId }, data: user });
  }

  async findOne(dto: Partial<User>, option: FindOption): Promise<User | null> {
    const row = await this.prisma.users.findFirst({
      where: { ...dto, ...(option.includeDeleted ? {} : { deletedAt: null }) },
    });

    return row ? new User(row) : null;
  }
}
