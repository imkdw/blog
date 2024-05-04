import UserSignupChannel from '../../../src/modules/user/entities/user-signup-channel/user-signup-channel.entity';
import { UserSignupChannel } from '../../../src/modules/user/enums/user-signup-channel.enum';

const userSignUpChannelSeed: Pick<UserSignupChannel, 'name'>[] = [
  {
    name: UserSignupChannel.COMMON,
  },
  {
    name: UserSignupChannel.OAUTH,
  },
];

export default userSignUpChannelSeed;
