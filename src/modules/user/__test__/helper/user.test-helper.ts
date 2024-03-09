import { faker } from '@faker-js/faker';
import prisma from '../../../../../prisma/__test__/prisma';

import { generateNickname, generatePassword } from '../utils/user.test-util';
import { SYSTEM_USER_ID } from '../../../../common/constants/system.constant';
import { IUserRoles } from '../../domain/entities/user-role.entity';
import { IUserSignupChannels } from '../../domain/entities/user-signup-channel.entity';

export interface CreateUserOption {
  role: IUserRoles;
  signupChannel: IUserSignupChannels;
}
export const createUser = async (option: CreateUserOption) => {
  const userRole = await prisma.userRole.findUnique({ where: { name: option.role } });
  const signUpChannel = await prisma.userSignupChannel.findUnique({ where: { name: option.signupChannel } });

  const createdUser = await prisma.users.create({
    data: {
      email: faker.internet.email(),
      nickname: generateNickname('valid'),
      password: generatePassword('valid'),
      profile: faker.internet.url(),
      signupChannelId: signUpChannel.id,
      roleId: userRole.id,
      createUser: SYSTEM_USER_ID,
      updateUser: SYSTEM_USER_ID,
    },
  });

  return createdUser;
};
