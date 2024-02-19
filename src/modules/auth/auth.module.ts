import { ClassProvider, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthCommonServiceSymbol } from './types/service/auth-common.service';
import AuthCommonServiceImpl from './service/auth-common-impl.service';
import AuthCommonController from './controller/auth-common.controller';
import UserModule from '../user/user.module';
import MyConfigModule from '../../infra/config/my-config.module';
import { MyJwtServiceSymbol } from './types/service/my-jwt.service';
import MyJwtServiceImpl from './service/my-jwt-impl.service';
import { BcryptServiceSymbol } from './types/service/bcrypt.service';
import BcryptServiceImpl from './service/bcrypt-impl.service';
import { AuthOAuthServiceSymbol } from './types/service/auth-oauth.service';
import AuthOAuthServiceImpl from './service/auth-oauth-impl.service';
import MyApiModule from '../../infra/api/my-api.module';
import { ExOAuthProviderRepositorySymbol } from './types/repository/ex-oauth-provider.repository';
import ExOAuthProviderPrismaRepository from './repository/ex-oauth-provider-prisma.repository';
import PrismaModule from '../../infra/database/prisma/prisma.module';
import { ExOAuthDataRepositorySymbol } from './types/repository/ex-oauth-data.repository';
import ExOAuthDataPrismaRepository from './repository/ex-oauth-data-prisma.repository';
import AuthOAuthController from './controller/auth-oauth.controller';
import CommonModule from '../../common/common.module';

const AuthCommonServiceProvider: ClassProvider = {
  provide: AuthCommonServiceSymbol,
  useClass: AuthCommonServiceImpl,
};

const MyJwtServiceProvider = {
  provide: MyJwtServiceSymbol,
  useClass: MyJwtServiceImpl,
};

const BcryptServiceProvider = {
  provide: BcryptServiceSymbol,
  useClass: BcryptServiceImpl,
};

const AuthOAuthServiceProvider: ClassProvider = {
  provide: AuthOAuthServiceSymbol,
  useClass: AuthOAuthServiceImpl,
};

const AuthOAuthProviderRepositoryProvider: ClassProvider = {
  provide: ExOAuthProviderRepositorySymbol,
  useClass: ExOAuthProviderPrismaRepository,
};

const ExOAuthDataRepositoryProvider: ClassProvider = {
  provide: ExOAuthDataRepositorySymbol,
  useClass: ExOAuthDataPrismaRepository,
};
@Module({
  imports: [UserModule, MyConfigModule, JwtModule.register({}), MyApiModule, PrismaModule, CommonModule],
  controllers: [AuthCommonController, AuthOAuthController],
  providers: [
    AuthCommonServiceProvider,
    MyJwtServiceProvider,
    BcryptServiceProvider,
    AuthOAuthServiceProvider,
    AuthOAuthProviderRepositoryProvider,
    ExOAuthDataRepositoryProvider,
  ],
  exports: [MyJwtServiceProvider],
})
export default class AuthModule {}
