import { ClassProvider, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthCommonServiceKey } from './interfaces/auth-common.interface';
import AuthCommonService from './service/auth-common.service';
import AuthCommonController from './controller/auth-common.controller';
import CommonModule from '../../common/common.module';
import UserModule from '../user/user.module';
import { AuthMapperKey } from './interfaces/auth.interface';
import AuthMapper from './mapper/auth.mapper';
import MyConfigModule from '../../infra/config/my-config.module';
import { MyJwtServiceKey } from './interfaces/my-jwt.interface';
import MyJwtService from './service/my-jwt.service';
import PrismaModule from '../../infra/database/prisma/prisma.module';

const AuthCommonServiceProvider: ClassProvider = {
  provide: AuthCommonServiceKey,
  useClass: AuthCommonService,
};

const AuthMapperProvider: ClassProvider = {
  provide: AuthMapperKey,
  useClass: AuthMapper,
};

const MyJwtServiceProvider: ClassProvider = {
  provide: MyJwtServiceKey,
  useClass: MyJwtService,
};

@Module({
  imports: [CommonModule, UserModule, MyConfigModule, JwtModule.register({}), PrismaModule],
  controllers: [AuthCommonController],
  providers: [AuthCommonServiceProvider, AuthMapperProvider, MyJwtServiceProvider],
})
export default class AuthModule {}
