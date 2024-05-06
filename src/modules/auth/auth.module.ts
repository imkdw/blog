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
import MyApiModule from '../../infra/api/my-api.module';
import AuthController from './controllers/auth.controller';
import OAuthService from './services/oauth.service';
import OAuthDataRepository from './repository/oauth-data.repository';
import OAuthProviderRepository from './repository/oauth-provider.repository';
import AuthService from './services/auth.service';

const MyJwtServiceProvider: ClassProvider = {
  provide: MyJwtServiceKey,
  useClass: MyJwtService,
};

@Module({
  imports: [CommonModule, UserModule, MyConfigModule, JwtModule.register({}), PrismaModule, EmailModule, MyApiModule],
  controllers: [OAuthController, AuthController],
  providers: [MyJwtServiceProvider, OAuthService, OAuthDataRepository, OAuthProviderRepository, AuthService],
  exports: [MyJwtServiceProvider],
})
export default class AuthModule {}
