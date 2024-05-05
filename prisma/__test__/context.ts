import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

export type Context = {
  prisma: PrismaClient;
};

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>;
};

const createMockContext = (): MockContext => ({
  prisma: mockDeep<PrismaClient>(),
});

export default createMockContext;
