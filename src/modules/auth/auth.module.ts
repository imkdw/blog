import { ClassProvider, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import CommonModule from '../../common/common.module';
import UserModule from '../user/user.module';
import MyConfigModule from '../../infra/config/my-config.module';
import { MyJwtServiceKey } from './interfaces/my-jwt.interface';
import MyJwtService from './services/my-jwt.service';
import PrismaModule from '../../infra/database/prisma/prisma.module';
import EmailModule from '../../infra/email/email.module';
import OAuthController from './controllers/oauth.controller';
import { OAuthDataRepositoryKey, OAuthProviderRepositoryKey, OAuthServiceKey } from './interfaces/oauth.interface';
import OAuthDataRepository from './repository/oauth-data.repository';
import OAuthService from './services/oauth.service';
import OAuthProviderRepository from './repository/oauth-provider.repository';
import MyApiModule from '../../infra/api/my-api.module';
import AuthController from './controllers/auth.controller';
import { AuthServiceProvider } from './providers/auth.provider';

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
