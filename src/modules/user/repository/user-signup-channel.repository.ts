import { Inject, Injectable } from '@nestjs/common';
import { IUserSignupChannelRepository } from '../interfaces/user-signup-channel.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import { IUserMapper, UserMapperKey } from '../interfaces/user.interface';

@Injectable()
export default class UserSignupChannelRepository implements IUserSignupChannelRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(UserMapperKey) private readonly userMapper: IUserMapper,
  ) {}

  async findByName(name: string, option: FindOption) {
    const row = await this.prisma.userSignupChannel.findFirst({
      where: { name, ...(option.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? this.userMapper.toUserSignupChannel(row) : null;
  }

  async findById(id: number, option: FindOption) {
    const row = await this.prisma.userSignupChannel.findFirst({
      where: { id, ...(option.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? this.userMapper.toUserSignupChannel(row) : null;
  }
}
