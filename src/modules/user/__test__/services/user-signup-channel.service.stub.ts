import { FindOption } from '../../../../common/interfaces/find-option.interface';
import UserSignupChannel from '../../domain/user-signup-channel/user-signup-channel.domain';
import { IUserSignupChannelService } from '../../interfaces/user-signup-channel.interface';

export default class UserSignupChannelServiceStub implements IUserSignupChannelService {
  private memory: UserSignupChannel[] = [];

  async findByName(name: string, option?: FindOption): Promise<UserSignupChannel | null> {
    const signupChannel = this.memory.find((item) => item.name === name);
    if (!signupChannel) return null;
    if (option?.includeDeleted && signupChannel?.deleteAt) return null;

    return signupChannel;
  }

  protected reset() {
    this.memory = [];
  }
}
