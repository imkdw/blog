import { Inject, Injectable } from '@nestjs/common';
import { UserSignupChannelService } from '../types/service/user-signup-channel.service';
import { FindOption } from '../../../common/types/interfaces/find-option.interface';
import UserSignUpChannel from '../domain/user-signup-channel.entity';
import {
  UserSignupChannelRepository,
  UserSignupChannelRepositorySymbol,
} from '../types/repository/user-signup-channel.repository';

@Injectable()
export default class UserSignupChannelServiceImpl implements UserSignupChannelService {
  constructor(
    @Inject(UserSignupChannelRepositorySymbol)
    private readonly userSignupChannelRepository: UserSignupChannelRepository,
  ) {}

  async findByName(name: string, option: FindOption): Promise<UserSignUpChannel | null> {
    const userSignupChannel = await this.userSignupChannelRepository.findByName(name, option);
    return userSignupChannel;
  }
}
