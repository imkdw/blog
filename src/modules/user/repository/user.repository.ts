import { Injectable } from '@nestjs/common';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import { TX } from '../../../common/types/prisma';
import { IUserRepository } from '../interfaces/user.interface';
import UserEntity from '../entities/user.entity';
import UserCreateEntity from '../entities/user-create.entity';

@Injectable()
export default class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: UserCreateEntity, tx: TX): Promise<UserEntity> {
    const row = await tx.users.create({ data: user });
    return new UserEntity(row);
  }

  async update(userId: string, user: Partial<UserEntity>, tx: TX): Promise<void> {
    await tx.users.update({ where: { id: userId }, data: user });
  }

  async findById(id: string, option?: FindOption): Promise<UserEntity | null> {
    const row = await this.prisma.users.findUnique({
      where: { id, ...(option?.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? new UserEntity(row) : null;
  }

  async findByEmail(email: string, option?: FindOption): Promise<UserEntity | null> {
    const row = await this.prisma.users.findFirst({
      where: { email, ...(option?.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? new UserEntity(row) : null;
  }

  async findByNickname(nickname: string, option?: FindOption): Promise<UserEntity | null> {
    const row = await this.prisma.users.findFirst({
      where: { nickname, ...(option?.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? new UserEntity(row) : null;
  }
}
