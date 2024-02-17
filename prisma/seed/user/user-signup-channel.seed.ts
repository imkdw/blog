import { usersSignUpChannel } from '@prisma/client';
import { UserSignUpChannels } from '../../../src/modules/user/domain/user.entity';

const userSignUpChannelSeed: Pick<usersSignUpChannel, 'name'>[] = [
  {
    name: UserSignUpChannels.COMMON,
  },
  {
    name: UserSignUpChannels.OAUTH,
  },
];

export default userSignUpChannelSeed;
