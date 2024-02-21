import { users } from '@prisma/client';
import { IUserRoles, IUserSignUpChannels } from '../../../domain/user.entity';

export interface SaveUserDto extends Pick<users, 'email' | 'password' | 'nickname' | 'profile'> {
  signUpChannel: IUserSignUpChannels;
  role: IUserRoles;
}
