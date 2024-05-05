import UserSignupChannel from '../../../src/modules/user/entities/user-signup-channel/user-signup-channel.entity';
import { UserSignupChannels } from '../../../src/modules/user/enums/user-signup-channel.enum';

const userSignUpChannelSeed: Pick<UserSignupChannel, 'name'>[] = [
  {
    name: UserSignupChannels.COMMON,
  },
  {
    name: UserSignupChannels.OAUTH,
  },
];

export default userSignUpChannelSeed;
