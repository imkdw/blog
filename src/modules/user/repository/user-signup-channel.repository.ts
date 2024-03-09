import { Injectable } from '@nestjs/common';
import { IUserSignupChannelRepository } from '../interfaces/user-signup-channel.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import UserSignupChannel from '../domain/entities/user-signup-channel.entity';

@Injectable()
export default class UserSignupChannelRepository implements IUserSignupChannelRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByName(name: string, option: FindOption): Promise<UserSignupChannel> {
    const row = await this.prisma.userSignupChannel.findFirst({
      where: { name, ...(option.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row;
  }
}
