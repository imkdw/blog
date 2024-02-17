import { PrismaClient } from '@prisma/client';
import { Logger } from '@nestjs/common';

import userSignUpChannelSeed from './user/user-signup-channel.seed';
import userRoleSeed from './user/user-role.seed';

const prisma = new PrismaClient();

// 시딩 데이터에 공통 컬럼을 추가
function addCommonFields<T>(data: T[]): Array<T & { createUser: string; updateUser: string }> {
  return data.map((d) => ({
    ...d,
    createUser: '_system',
    updateUser: '_system',
  }));
}

async function createSeed<T>(data: T[], inserter: (input: T[]) => Promise<unknown>) {
  try {
    await inserter(data);
  } catch (e) {
    Logger.error(e);
  }
}

async function main() {
  await createSeed(addCommonFields(userSignUpChannelSeed), (data) =>
    prisma.usersSignUpChannel.createMany({ data, skipDuplicates: true }),
  );

  await createSeed(addCommonFields(userRoleSeed), (data) =>
    prisma.usersRole.createMany({ data, skipDuplicates: true }),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    Logger.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
