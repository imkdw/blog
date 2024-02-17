import { ClassProvider, Module } from '@nestjs/common';
import { UserServiceSymbol } from './types/user.service';
import UserServiceImpl from './service/user-impl.service';
import { UserRepositorySymbol } from './types/user.repository';
import UserPrismaRepository from './repository/user-prisma.repository';
import PrismaModule from '../../infra/database/prisma/prisma.module';

const UserServiceProvider: ClassProvider = {
  provide: UserServiceSymbol,
  useClass: UserServiceImpl,
};

const UserRepositoryProvider: ClassProvider = {
  provide: UserRepositorySymbol,
  useClass: UserPrismaRepository,
};

@Module({
  imports: [PrismaModule],
  providers: [UserServiceProvider, UserRepositoryProvider],
  exports: [UserServiceProvider],
})
export default class UserModule {}
