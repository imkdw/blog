import { Injectable } from '@nestjs/common';
import { IUserSignupChannelRepository } from '../interfaces/user-signup-channel.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import UserSignupChannel from '../domain/user-signup-channel/user-signup-channel.domain';

@Injectable()
export default class UserSignupChannelRepository implements IUserSignupChannelRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByName(name: string, option?: FindOption): Promise<UserSignupChannel | null> {
    const row = await this.prisma.userSignupChannel.findFirst({
      where: { name, ...(option.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? new UserSignupChannel(row) : null;
  }
}
