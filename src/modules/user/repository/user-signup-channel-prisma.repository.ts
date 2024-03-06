import { Injectable } from '@nestjs/common';
import { UserSignupChannelRepository } from '../types/repository/user-signup-channel.repository';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { toUserSignUpChannel } from '../mapper/user-signup-channel.mapper';
import { FindOption } from '../../../common/types/interfaces/find-option.interface';
import UserSignUpChannel from '../domain/user-signup-channel.entity';

@Injectable()
export default class UserSignupChannelPrismaRepository implements UserSignupChannelRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByName(name: string, option: FindOption): Promise<UserSignUpChannel | null> {
    const row = await this.prisma.usersSignUpChannel.findUnique({
      where: {
        name,
        ...(option.includeDeleted ? {} : { deleteAt: null }),
      },
    });

    return row ? toUserSignUpChannel(row) : null;
  }
}
