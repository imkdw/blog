import userSignUpChannelSeed from '../../../../../prisma/seed/user/user-signup-channel.seed';
import { FindOption } from '../../../../common/interfaces/find-option.interface';
import UserSignupChannelEntity from '../../entities/user-signup-channel/user-signup-channel.entity';
import { IUserSignupChannelService } from '../../interfaces/user-signup-channel.interface';

export default class UserSignupChannelServiceStub implements IUserSignupChannelService {
  private memory: UserSignupChannelEntity[] = [];

  async findByName(name: string, option?: FindOption): Promise<UserSignupChannelEntity | null> {
    const signupChannel = this.memory.find((item) => item.name === name);
    if (!signupChannel) return null;
    if (option?.includeDeleted && signupChannel?.deleteAt) return null;

    return signupChannel;
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
