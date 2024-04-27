import { ClassProvider, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import CommonModule from '../../common/common.module';
import UserModule from '../user/user.module';
import { AuthServiceKey } from './interfaces/auth.interface';
import MyConfigModule from '../../infra/config/my-config.module';
import { MyJwtServiceKey } from './interfaces/my-jwt.interface';
import MyJwtService from './service/my-jwt.service';
import PrismaModule from '../../infra/database/prisma/prisma.module';
import EmailModule from '../../infra/email/email.module';
import OAuthController from './controller/oauth.controller';
import { OAuthDataRepositoryKey, OAuthProviderRepositoryKey, OAuthServiceKey } from './interfaces/oauth.interface';
import OAuthDataRepository from './repository/oauth-data.repository';
import OAuthService from './service/oauth.service';
import OAuthProviderRepository from './repository/oauth-provider.repository';
import MyApiModule from '../../infra/api/my-api.module';
import AuthService from './service/auth.service';
import AuthController from './controller/auth.controller';

const MyJwtServiceProvider: ClassProvider = {
  provide: MyJwtServiceKey,
  useClass: MyJwtService,
};

const OAuthServiceProvider: ClassProvider = {
  provide: OAuthServiceKey,
  useClass: OAuthService,
};

const OAuthDataRepositoryProvider: ClassProvider = {
  provide: OAuthDataRepositoryKey,
  useClass: OAuthDataRepository,
};

const OAuthProviderRepositoryProvider: ClassProvider = {
  provide: OAuthProviderRepositoryKey,
  useClass: OAuthProviderRepository,
};

const AuthServiceProvider: ClassProvider = {
  provide: AuthServiceKey,
  useClass: AuthService,
};

@Module({
  imports: [CommonModule, UserModule, MyConfigModule, JwtModule.register({}), PrismaModule, EmailModule, MyApiModule],
  controllers: [OAuthController, AuthController],
  providers: [
    MyJwtServiceProvider,
    OAuthServiceProvider,
    OAuthDataRepositoryProvider,
    OAuthProviderRepositoryProvider,
    AuthServiceProvider,
  ],
  exports: [MyJwtServiceProvider],
})
export default class AuthModule {}
