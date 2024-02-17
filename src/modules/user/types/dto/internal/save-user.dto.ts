import { users } from '@prisma/client';
import { IUserRoles, IUserSignUpChannels } from '../../../domain/user.entity';

export interface SaveUserDto extends Pick<users, 'email' | 'password' | 'nickname'> {
  signUpChannel: IUserSignUpChannels;
  role: IUserRoles;
}
