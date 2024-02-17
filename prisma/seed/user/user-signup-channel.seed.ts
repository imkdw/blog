import { usersSignUpChannel } from '@prisma/client';
import { UserSignUpChannelNames } from '../../../src/modules/user/types/enums/sign-up-channel.enum';

const userSignUpChannelSeed: Pick<usersSignUpChannel, 'name'>[] = [
  {
    name: UserSignUpChannelNames.COMMON,
  },
  {
    name: UserSignUpChannelNames.OAUTH,
  },
];

export default userSignUpChannelSeed;
