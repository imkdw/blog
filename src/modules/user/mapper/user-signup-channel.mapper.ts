import { usersSignUpChannel } from '@prisma/client';
import UserSignUpChannel from '../domain/user-signup-channel.entity';
import { IUserSignUpChannelNames } from '../types/enums/sign-up-channel.enum';

// eslint-disable-next-line import/prefer-default-export
export function toUserSignUpChannel(signUpChannel: usersSignUpChannel): UserSignUpChannel {
  return {
    ...signUpChannel,
    name: signUpChannel.name as IUserSignUpChannelNames,
  };
}
