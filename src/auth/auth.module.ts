import { ClassProvider, Module } from '@nestjs/common';
import AuthCommonController from './adapter/in/web/auth-common.controller';
import { SignUpUsecaseSymbol } from './application/port/in/usecases/sign-up.usecase';
import AuthCommonService from './application/services/auth-common.service';
import UserModule from '../user/user.module';

const SignUpServiceProvider: ClassProvider = {
  provide: SignUpUsecaseSymbol,
  useClass: AuthCommonService,
};

@Module({ imports: [UserModule], controllers: [AuthCommonController], providers: [SignUpServiceProvider] })
export default class AuthModule {}
