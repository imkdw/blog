import { Inject, Injectable } from '@nestjs/common';
import {
  IUserSignupChannelRepository,
  IUserSignupChannelService,
  UserSignupChannelRepositoryKey,
} from '../interfaces/user-signup-channel.interface';
import { FindOption } from '../../../common/interfaces/find-option.interface';

@Injectable()
export default class UserSignupChannelService implements IUserSignupChannelService {
  constructor(
    @Inject(UserSignupChannelRepositoryKey) private readonly userSignupChannelRepository: IUserSignupChannelRepository,
  ) {}

  async findByName(name: string, option: FindOption) {
    const signupChannel = await this.userSignupChannelRepository.findByName(name, option);
    return signupChannel;
  }

  async findById(id: number, option: FindOption) {
    const signupChannel = await this.userSignupChannelRepository.findById(id, option);
    return signupChannel;
  }
}
