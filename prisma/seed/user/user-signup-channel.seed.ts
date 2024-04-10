import { userSignupChannel } from '@prisma/client';
import { UserSignupChannels } from '../../../src/modules/user/enums/user-signup-channel.enum';

const userSignUpChannelSeed: Pick<userSignupChannel, 'name'>[] = [
  {
    name: UserSignupChannels.COMMON,
  },
  {
    name: UserSignupChannels.OAUTH,
  },
];

export default userSignUpChannelSeed;
