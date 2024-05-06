import { Injectable } from '@nestjs/common';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import UserSignupChannel from '../entities/user-signup-channel/user-signup-channel.entity';
import UserSignupChannelRepository from '../repository/user-signup-channel.repository';

@Injectable()
export default class UserSignupChannelService {
  constructor(private readonly userSignupChannelRepository: UserSignupChannelRepository) {}

  async findByName(name: string, option?: FindOption): Promise<UserSignupChannel> {
    return this.userSignupChannelRepository.findByName(name, option);
  }
}
