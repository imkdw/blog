import { ClassProvider, Module } from '@nestjs/common';
import { UserServiceSymbol } from './types/service/user.service';
import UserServiceImpl from './service/user-impl.service';
import { UserRepositorySymbol } from './types/repository/user.repository';
import UserPrismaRepository from './repository/user-prisma.repository';
import PrismaModule from '../../infra/database/prisma/prisma.module';
import { UserOAuthServiceSymbol } from './types/service/user-oauth.service';
import UserOAuthServiceImpl from './service/user-oauth-impl.service';
import { UserOAuthRepositorySymbol } from './types/repository/user-oauth.repository';
import UserOAuthPrismaRepository from './repository/user-oauth-prisma.repository';

const UserServiceProvider: ClassProvider = {
  provide: UserServiceSymbol,
  useClass: UserServiceImpl,
};

const UserRepositoryProvider: ClassProvider = {
  provide: UserRepositorySymbol,
  useClass: UserPrismaRepository,
};

const UserOAuthServiceProvider: ClassProvider = {
  provide: UserOAuthServiceSymbol,
  useClass: UserOAuthServiceImpl,
};

const UserOAuthRepositoryProvider: ClassProvider = {
  provide: UserOAuthRepositorySymbol,
  useClass: UserOAuthPrismaRepository,
};

@Module({
  imports: [PrismaModule],
  providers: [UserServiceProvider, UserRepositoryProvider, UserOAuthServiceProvider, UserOAuthRepositoryProvider],
  exports: [UserServiceProvider, UserOAuthServiceProvider],
})
export default class UserModule {}
