import prisma from '../../../prisma/__test__/prisma';

// eslint-disable-next-line import/prefer-default-export
export const clearDatabase = async () => {
  const tables: { TABLE_NAME: string }[] =
    await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = 'imkdw_dev';`;

  await prisma.$transaction(async (tx) => {
    await tx.$executeRaw`SET foreign_key_checks = 0;`;
    const promises = tables.map((table) => tx.$executeRawUnsafe(`DELETE FROM ${table.TABLE_NAME};`));
    await Promise.all(promises);
    await tx.$executeRaw`SET foreign_key_checks = 1;`;
  });
};
