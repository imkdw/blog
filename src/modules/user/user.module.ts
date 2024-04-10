import { ClassProvider, Module } from '@nestjs/common';
import { UserRepositoryKey, UserServiceKey } from './interfaces/user.interface';
import UserService from './service/user.service';
import UserRepository from './repository/user.repository';
import PrismaModule from '../../infra/database/prisma/prisma.module';
import { UserRoleRepositoryKey, UserRoleServiceKey } from './interfaces/user-role.interface';
import UserRoleService from './service/user-role.service';
import UserRoleRepository from './repository/user-role.repository';
import {
  UserSignupChannelRepositoryKey,
  UserSignupChannelServiceKey,
} from './interfaces/user-signup-channel.interface';
import UserSignupChannelService from './service/user-signup-channel.service';
import UserSignupChannelRepository from './repository/user-signup-channel.repository';
import MyConfigModule from '../../infra/config/my-config.module';
import UserController from './controller/user.controller';

const UserServiceProvider: ClassProvider = {
  provide: UserServiceKey,
  useClass: UserService,
};

const UserRepositoryProvider: ClassProvider = {
  provide: UserRepositoryKey,
  useClass: UserRepository,
};

const UserRoleServiceProvider: ClassProvider = {
  provide: UserRoleServiceKey,
  useClass: UserRoleService,
};

const UserRoleRepositoryProvider: ClassProvider = {
  provide: UserRoleRepositoryKey,
  useClass: UserRoleRepository,
};

const UserSignupChannelServiceProvider: ClassProvider = {
  provide: UserSignupChannelServiceKey,
  useClass: UserSignupChannelService,
};

const UserSignupChannelRepositoryProvider: ClassProvider = {
  provide: UserSignupChannelRepositoryKey,
  useClass: UserSignupChannelRepository,
};

@Module({
  imports: [PrismaModule, MyConfigModule],
  controllers: [UserController],
  providers: [
    UserServiceProvider,
    UserRepositoryProvider,
    UserRoleServiceProvider,
    UserRoleRepositoryProvider,
    UserSignupChannelServiceProvider,
    UserSignupChannelRepositoryProvider,
  ],
  exports: [UserServiceProvider, UserRoleServiceProvider, UserSignupChannelServiceProvider],
})
export default class UserModule {}
