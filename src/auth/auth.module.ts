import { ClassProvider, Module } from '@nestjs/common';
import { AuthCommonServiceSymbol } from './types/auth-common.service';
import AuthCommonServiceImpl from './service/auth-common-impl.service';
import AuthCommonController from './controller/auth-common.controller';
import UserModule from '../user/user.module';

const AuthCommonServiceProvider: ClassProvider = {
  provide: AuthCommonServiceSymbol,
  useClass: AuthCommonServiceImpl,
};

@Module({
  imports: [UserModule],
  controllers: [AuthCommonController],
  providers: [AuthCommonServiceProvider],
})
export default class AuthModule {}
