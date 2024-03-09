import { userSignupChannel } from '@prisma/client';
import { UserSignupChannels } from '../../../src/modules/user/domain/entities/user-signup-channel.entity';

const userSignUpChannelSeed: Pick<userSignupChannel, 'name'>[] = [
  {
    name: UserSignupChannels.COMMON,
  },
  {
    name: UserSignupChannels.OAUTH,
  },
];

export default userSignUpChannelSeed;
