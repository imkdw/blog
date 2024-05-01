import { Injectable } from '@nestjs/common';
import { IUserSignupChannelRepository } from '../interfaces/user-signup-channel.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import UserSignupChannelEntity from '../entities/user-signup-channel/user-signup-channel.entity';

@Injectable()
export default class UserSignupChannelRepository implements IUserSignupChannelRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByName(name: string, option?: FindOption): Promise<UserSignupChannelEntity | null> {
    const row = await this.prisma.userSignupChannel.findFirst({
      where: { name, ...(option.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? new UserSignupChannelEntity(row) : null;
  }
}
