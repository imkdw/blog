import { Module } from '@nestjs/common';
import UserService from './service/user.service';
import UserRepository from './repository/user.repository';
import PrismaModule from '../../infra/database/prisma/prisma.module';
import UserRoleService from './service/user-role.service';
import UserRoleRepository from './repository/user-role.repository';
import UserSignupChannelService from './service/user-signup-channel.service';
import UserSignupChannelRepository from './repository/user-signup-channel.repository';
import MyConfigModule from '../../infra/config/my-config.module';
import UserController from './controller/user.controller';

@Module({
  imports: [PrismaModule, MyConfigModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserRoleService,
    UserRoleRepository,
    UserSignupChannelService,
    UserSignupChannelRepository,
  ],
  exports: [UserService, UserRoleService, UserSignupChannelService],
})
export default class UserModule {}
