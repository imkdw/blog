import UserSignupChannel from '../../../modules/user/entities/user-signup-channel/user-signup-channel.entity';
import { UserSignupChannels } from '../../../modules/user/enums/user-signup-channel.enum';

const userSignUpChannelSeed: Pick<UserSignupChannel, 'name'>[] = [
  {
    name: UserSignupChannels.COMMON,
  },
  {
    name: UserSignupChannels.OAUTH,
  },
];

export default userSignUpChannelSeed;
