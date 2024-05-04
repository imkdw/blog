import userSignUpChannelSeed from '../../../../../prisma/seed/user/user-signup-channel.seed';
import { FindOption } from '../../../../common/interfaces/find-option.interface';
import UserSignupChannel from '../../entities/user-signup-channel/user-signup-channel.entity';
import { IUserSignupChannelRepository } from '../../interfaces/user-signup-channel.interface';

export default class UserSignupChannelRepositoryStub implements IUserSignupChannelRepository {
  private memory: UserSignupChannel[] = [];

  async findByName(name: string, option?: FindOption): Promise<UserSignupChannel | null> {
    const channel = this.memory.find((item) => item.name === name);
    if (!channel) return null;
    if (option?.includeDeleted && channel?.deleteAt) return null;

    return channel;
  }

  init() {
    userSignUpChannelSeed.map((channel, index) =>
      this.memory.push(
        new UserSignupChannel({
          id: index + 1,
          name: channel.name,
        }),
      ),
    );
  }

  reset() {
    this.memory = [];
  }
}
