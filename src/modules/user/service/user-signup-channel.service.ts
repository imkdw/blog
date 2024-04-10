import { Inject, Injectable } from '@nestjs/common';
import {
  IUserSignupChannelRepository,
  IUserSignupChannelService,
  UserSignupChannelRepositoryKey,
} from '../interfaces/user-signup-channel.interface';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import UserSignupChannel from '../domain/user-signup-channel/user-signup-channel.domain';

@Injectable()
export default class UserSignupChannelService implements IUserSignupChannelService {
  constructor(
    @Inject(UserSignupChannelRepositoryKey) private readonly userSignupChannelRepository: IUserSignupChannelRepository,
  ) {}

  async findOne(dto: Partial<UserSignupChannel>, option?: FindOption): Promise<UserSignupChannel | null> {
    return this.userSignupChannelRepository.findOne(dto, option);
  }
}
