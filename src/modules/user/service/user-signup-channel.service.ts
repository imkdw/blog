import { Inject, Injectable } from '@nestjs/common';
import {
  IUserSignupChannelRepository,
  IUserSignupChannelService,
  UserSignupChannelRepositoryKey,
} from '../interfaces/user-signup-channel.interface';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import UserSignupChannelEntity from '../entities/user-signup-channel/user-signup-channel.entity';

@Injectable()
export default class UserSignupChannelService implements IUserSignupChannelService {
  constructor(
    @Inject(UserSignupChannelRepositoryKey) private readonly userSignupChannelRepository: IUserSignupChannelRepository,
  ) {}

  async findByName(name: string, option?: FindOption): Promise<UserSignupChannelEntity> {
    return this.userSignupChannelRepository.findByName(name, option);
  }
}
