import { faker } from '@faker-js/faker';
import prisma from '../../../../../prisma/__test__/prisma';
import { SYSTEM_USER_ID } from '../../../../common/constants/system.constant';

// eslint-disable-next-line import/prefer-default-export
export const createEmailVerification = async () => {
  const code = faker.helpers.replaceSymbols('??????');

  const expiredAt = new Date();
  expiredAt.setHours(expiredAt.getHours() + 1);

  const createdEmailVerification = await prisma.emailVerification.create({
    data: {
      email: faker.internet.email(),
      code,
      expiredAt,
      createUser: SYSTEM_USER_ID,
      updateUser: SYSTEM_USER_ID,
    },
  });

  return createdEmailVerification;
};
