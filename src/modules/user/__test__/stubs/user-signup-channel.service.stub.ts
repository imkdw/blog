import { FindOption } from '../../../../common/interfaces/find-option.interface';
import userSignUpChannelSeed from '../../../../prisma/seed/user/user-signup-channel.seed';
import UserSignupChannel from '../../entities/user-signup-channel/user-signup-channel.entity';
import { IUserSignupChannelService } from '../../interfaces/user-signup-channel.interface';

export default class UserSignupChannelServiceStub implements IUserSignupChannelService {
  private memory: UserSignupChannel[] = [];

  async findByName(name: string, option?: FindOption): Promise<UserSignupChannel | null> {
    const signupChannel = this.memory.find((item) => item.name === name);
    if (!signupChannel) return null;
    if (option?.includeDeleted && signupChannel?.deleteAt) return null;

    return signupChannel;
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
