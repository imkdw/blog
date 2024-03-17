import { ClassProvider, Module, ValidationPipe, ValueProvider } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import TransformInterceptor from './common/interceptors/transform.interceptor';
import AuthModule from './modules/auth/auth.module';
import UserModule from './modules/user/user.module';
import AppController from './app.controller';
import AllExceptionFilter from './common/filters/all-exceptions.filter';
import CategoryModule from './modules/category/category.module';
import JwtGuard from './modules/auth/guards/jwt.guard';
import UserContextInterceptor from './common/interceptors/user-context.interceptor';
import LocalStorageModule from './infra/local-storage/local-storage.module';

const JwtGuardProvider: ClassProvider = {
  provide: APP_GUARD,
  useClass: JwtGuard,
};

const TransformInterceptorProvider: ClassProvider = {
  provide: APP_INTERCEPTOR,
  useClass: TransformInterceptor,
};

const ValidationPipeProvider: ValueProvider = {
  provide: APP_PIPE,
  useValue: new ValidationPipe({
    stopAtFirstError: true,
  }),
};

const ExceptionFilterProvider: ClassProvider = {
  provide: APP_FILTER,
  useClass: AllExceptionFilter,
};

const UserContextInterceptorProvider: ClassProvider = {
  provide: APP_INTERCEPTOR,
  useClass: UserContextInterceptor,
};

@Module({
  imports: [AuthModule, UserModule, CategoryModule, LocalStorageModule],
  controllers: [AppController],
  providers: [
    ValidationPipeProvider,
    TransformInterceptorProvider,
    ExceptionFilterProvider,
    JwtGuardProvider,
    UserContextInterceptorProvider,
  ],
})
export default class AppModule {}
