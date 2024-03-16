import { ClassProvider, Module, ValidationPipe, ValueProvider } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import TransformInterceptor from './common/interceptors/transform.interceptor';
import AuthModule from './modules/auth/auth.module';
import UserModule from './modules/user/user.module';
import AppController from './app.controller';
import AllExceptionFilter from './common/filters/all-exceptions.filter';
import CategoryModule from './modules/category/category.module';

// const AuthGuardProvider: ClassProvider = {
//   provide: APP_GUARD,
//   useClass: AuthGuard,
// };

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

@Module({
  imports: [AuthModule, UserModule, CategoryModule],
  controllers: [AppController],
  providers: [ValidationPipeProvider, TransformInterceptorProvider, ExceptionFilterProvider],
})
export default class AppModule {}
