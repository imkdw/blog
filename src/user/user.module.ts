import { Module } from '@nestjs/common';
import { SaveUserUsecaseSymbol } from './application/port/in/usecases/save-user.usecase';
import UserService from './application/user.service';
import { UserRepositorySymbol } from './application/port/out/user.repository';
import UserMemoryAdapter from './adapter/out/user-memory.adapter';

const SaveUserServiceProvider = {
  provide: SaveUserUsecaseSymbol,
  useClass: UserService,
};

const UserMemoryAdapterProvider = {
  provide: UserRepositorySymbol,
  useClass: UserMemoryAdapter,
};

@Module({
  providers: [SaveUserServiceProvider, UserMemoryAdapterProvider],
  exports: [SaveUserServiceProvider],
})
export default class UserModule {}
