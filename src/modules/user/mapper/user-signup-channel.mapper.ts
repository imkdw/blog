import { usersSignUpChannel } from '@prisma/client';
import UserSignUpChannel from '../domain/user-signup-channel.entity';
import { IUserSignUpChannels } from '../domain/user.entity';

// eslint-disable-next-line import/prefer-default-export
export function toUserSignUpChannel(signUpChannel: usersSignUpChannel): UserSignUpChannel {
  return {
    ...signUpChannel,
    name: signUpChannel.name as IUserSignUpChannels,
  };
}
