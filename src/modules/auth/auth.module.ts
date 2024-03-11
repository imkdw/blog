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
import { AuthEmailRepositoryKey, AuthEmailServiceKey } from './interfaces/auth-email.interface';
import AuthEmailService from './service/auth-email.service';
import AuthEmailRepository from './repository/auth-email.repository';
import EmailModule from '../../infra/email/email.module';
import AuthEmailController from './controller/auth-email.controller';

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

const AuthEmailServiceProvider: ClassProvider = {
  provide: AuthEmailServiceKey,
  useClass: AuthEmailService,
};

const AuthEmailRepositoryProvider: ClassProvider = {
  provide: AuthEmailRepositoryKey,
  useClass: AuthEmailRepository,
};

@Module({
  imports: [CommonModule, UserModule, MyConfigModule, JwtModule.register({}), PrismaModule, EmailModule],
  controllers: [AuthCommonController, AuthEmailController],
  providers: [
    AuthCommonServiceProvider,
    AuthMapperProvider,
    MyJwtServiceProvider,
    AuthEmailServiceProvider,
    AuthEmailRepositoryProvider,
  ],
})
export default class AuthModule {}
