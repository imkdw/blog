import { ClassProvider, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthCommonServiceSymbol } from './types/auth-common.service';
import AuthCommonServiceImpl from './service/auth-common-impl.service';
import AuthCommonController from './controller/auth-common.controller';
import UserModule from '../user/user.module';
import MyConfigModule from '../../infra/config/my-config.module';
import { MyJwtServiceSymbol } from './types/my-jwt.service';
import MyJwtServiceImpl from './service/my-jwt-impl.service';
import { BcryptServiceSymbol } from './types/bcrypt.service';
import BcryptServiceImpl from './service/bcrypt-impl.service';

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

@Module({
  imports: [UserModule, MyConfigModule, JwtModule.register({})],
  controllers: [AuthCommonController],
  providers: [AuthCommonServiceProvider, MyJwtServiceProvider, BcryptServiceProvider],
})
export default class AuthModule {}
