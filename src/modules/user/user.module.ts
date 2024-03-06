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
import { UserRoleServiceSymbol } from './types/service/user-role.service';
import UserRoleServiceImpl from './service/user-role-impl.service';
import { UserRoleRepositorySymbol } from './types/repository/user-role.repository';
import UserRolePrismaRepository from './repository/user-role-prisma.repository';
import { UserSignupChannelServiceSymbol } from './types/service/user-signup-channel.service';
import UserSignupChannelServiceImpl from './service/user-signup-channel-impl.service';
import { UserSignupChannelRepositorySymbol } from './types/repository/user-signup-channel.repository';
import UserSignupChannelPrismaRepository from './repository/user-signup-channel-prisma.repository';

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

const UserRoleServiceProvider: ClassProvider = {
  provide: UserRoleServiceSymbol,
  useClass: UserRoleServiceImpl,
};

const UserRoleRepositoryProvider: ClassProvider = {
  provide: UserRoleRepositorySymbol,
  useClass: UserRolePrismaRepository,
};

const UserSignupChannelServiceProvider: ClassProvider = {
  provide: UserSignupChannelServiceSymbol,
  useClass: UserSignupChannelServiceImpl,
};

const UserSignupChannelRepositoryProvider: ClassProvider = {
  provide: UserSignupChannelRepositorySymbol,
  useClass: UserSignupChannelPrismaRepository,
};

@Module({
  imports: [PrismaModule],
  providers: [
    UserServiceProvider,
    UserRepositoryProvider,
    UserOAuthServiceProvider,
    UserOAuthRepositoryProvider,
    UserRoleServiceProvider,
    UserRoleRepositoryProvider,
    UserSignupChannelServiceProvider,
    UserSignupChannelRepositoryProvider,
  ],
  exports: [UserServiceProvider, UserOAuthServiceProvider, UserRoleServiceProvider, UserSignupChannelServiceProvider],
})
export default class UserModule {}
