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
import { OAuthServiceSymbol } from './types/service/auth-oauth.service';
import OAuthServiceImpl from './service/oauth-impl.service';
import MyApiModule from '../../infra/api/my-api.module';
import { ExOAuthProviderRepositorySymbol } from './types/repository/ex-oauth-provider.repository';
import ExOAuthProviderPrismaRepository from './repository/ex-oauth-provider-prisma.repository';
import PrismaModule from '../../infra/database/prisma/prisma.module';
import { ExOAuthDataRepositorySymbol } from './types/repository/ex-oauth-data.repository';
import ExOAuthDataPrismaRepository from './repository/ex-oauth-data-prisma.repository';
import AuthOAuthController from './controller/oauth.controller';
import CommonModule from '../../common/common.module';
import { AuthMapperSymbol } from './types/mapper/auth.mapper';
import AuthMapperImpl from './mapper/auth-impl.mapper';
import { ExOAuthProviderServiceSymbol } from './types/service/ex-oauth-provider.service';
import ExOAuthProviderServiceImpl from './service/ex-oauth-provider-impl.service';

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

const OAuthServiceProvider: ClassProvider = {
  provide: OAuthServiceSymbol,
  useClass: OAuthServiceImpl,
};

const AuthOAuthProviderRepositoryProvider: ClassProvider = {
  provide: ExOAuthProviderRepositorySymbol,
  useClass: ExOAuthProviderPrismaRepository,
};

const ExOAuthDataRepositoryProvider: ClassProvider = {
  provide: ExOAuthDataRepositorySymbol,
  useClass: ExOAuthDataPrismaRepository,
};

const AuthMapperProvider: ClassProvider = {
  provide: AuthMapperSymbol,
  useClass: AuthMapperImpl,
};

const ExOAuthServiceProvider: ClassProvider = {
  provide: ExOAuthProviderServiceSymbol,
  useClass: ExOAuthProviderServiceImpl,
};

const ExOAuthRepositoryProvider: ClassProvider = {
  provide: ExOAuthProviderRepositorySymbol,
  useClass: ExOAuthProviderPrismaRepository,
};

@Module({
  imports: [UserModule, MyConfigModule, JwtModule.register({}), MyApiModule, PrismaModule, CommonModule],
  controllers: [AuthCommonController, AuthOAuthController],
  providers: [
    AuthCommonServiceProvider,
    MyJwtServiceProvider,
    BcryptServiceProvider,
    OAuthServiceProvider,
    AuthOAuthProviderRepositoryProvider,
    ExOAuthDataRepositoryProvider,
    AuthMapperProvider,
    ExOAuthServiceProvider,
    ExOAuthRepositoryProvider,
  ],
  exports: [MyJwtServiceProvider],
})
export default class AuthModule {}
