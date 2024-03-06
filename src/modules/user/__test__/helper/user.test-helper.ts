import { faker } from '@faker-js/faker';

import { IUserRoles, IUserSignUpChannels } from '../../domain/user.entity';
import { generateNickname, generatePassword } from '../utils/user.test-util';
import { SYSTEM_USER_ID } from '../../../../common/constants/system.constant';

export interface CreateUserOption {
  role: IUserRoles;
  signupChannel: IUserSignUpChannels;
}
export const createUser = async (option: CreateUserOption) => {
  const userRole = await prisma.usersRole.findUnique({ where: { name: option.role } });
  const signUpChannel = await prisma.usersSignUpChannel.findUnique({ where: { name: option.signupChannel } });

  const createdUser = await prisma.users.create({
    data: {
      email: faker.internet.email(),
      nickname: generateNickname('valid'),
      password: generatePassword('valid'),
      profile: faker.internet.url(),
      signUpChannelId: signUpChannel.id,
      roleId: userRole.id,
      createUser: SYSTEM_USER_ID,
      updateUser: SYSTEM_USER_ID,
    },
  });

  return createdUser;
};
