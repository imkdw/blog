import userSignUpChannelSeed from '../../../../../prisma/seed/user/user-signup-channel.seed';
import { FindOption } from '../../../../common/interfaces/find-option.interface';
import UserSignupChannelEntity from '../../entities/user-signup-channel/user-signup-channel.entity';
import { IUserSignupChannelRepository } from '../../interfaces/user-signup-channel.interface';

export default class UserSignupChannelRepositoryStub implements IUserSignupChannelRepository {
  private memory: UserSignupChannelEntity[] = [];

  async findByName(name: string, option?: FindOption): Promise<UserSignupChannelEntity | null> {
    const channel = this.memory.find((item) => item.name === name);
    if (!channel) return null;
    if (option?.includeDeleted && channel?.deleteAt) return null;

    return channel;
  }

  init() {
    userSignUpChannelSeed.map((channel, index) =>
      this.memory.push(
        new UserSignupChannelEntity({
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
