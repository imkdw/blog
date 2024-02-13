import { ClassProvider, Module } from '@nestjs/common';
import { UserServiceSymbol } from './types/user.service';
import UserServiceImpl from './service/user-impl.service';
import { UserRepositorySymbol } from './types/user.repository';
import UserMemoryRepository from './repository/user-memory.repository';

const UserServiceProvider: ClassProvider = {
  provide: UserServiceSymbol,
  useClass: UserServiceImpl,
};

const UserRepositoryProvider: ClassProvider = {
  provide: UserRepositorySymbol,
  useClass: UserMemoryRepository,
};

@Module({
  providers: [UserServiceProvider, UserRepositoryProvider],
  exports: [UserServiceProvider],
})
export default class UserModule {}
