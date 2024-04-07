import { faker } from '@faker-js/faker';
import { sign } from 'jsonwebtoken';

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

/**
 * 인증토큰 및 JWT 토큰 생성
 */
interface CreateTokenOption {
  userId: string;
  isExpired?: boolean;
}
export const createJwtToken = ({ userId, isExpired }: CreateTokenOption) => {
  const expiresIn = isExpired ? '-10s' : '1d';

  const accessToken = sign({ userId }, process.env.JWT_SECRET, { expiresIn });
  const refreshToken = sign({ userId }, process.env.JWT_SECRET, { expiresIn });

  const tokenCookie = `accessToken=${accessToken}; refreshToken=${refreshToken}`;

  return { tokenCookie };
};
