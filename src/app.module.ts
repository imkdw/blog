import {
  ClassProvider,
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
  ValueProvider,
} from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import TransformInterceptor from './common/interceptors/transform.interceptor';
import AuthModule from './modules/auth/auth.module';
import UserModule from './modules/user/user.module';
import AppController from './app.controller';
import AllExceptionFilter from './common/filters/all-exceptions.filter';
import CategoryModule from './modules/category/category.module';
import JwtGuard from './modules/auth/guards/jwt.guard';
import LocalStorageModule from './infra/local-storage/local-storage.module';
import TagModule from './modules/tag/tag.module';
import ArticleModule from './modules/article/article.module';
import AwsModule from './infra/aws/aws.module';
import JwtCookieMiddleware from './common/middlewares/jwt-cookie.middleware';
import ContextInterceptor from './common/interceptors/context.interceptor';

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

const ContextInterceptorProvider: ClassProvider = {
  provide: APP_INTERCEPTOR,
  useClass: ContextInterceptor,
};

const ClassSerializerInterceptorProvider: ClassProvider = {
  provide: APP_INTERCEPTOR,
  useClass: ClassSerializerInterceptor,
};

@Module({
  imports: [
    AuthModule,
    UserModule,
    CategoryModule,
    LocalStorageModule,
    TagModule,
    ArticleModule,
    AwsModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    ValidationPipeProvider,
    TransformInterceptorProvider,
    ExceptionFilterProvider,
    JwtGuardProvider,
    ContextInterceptorProvider,
    ClassSerializerInterceptorProvider,
  ],
})
export default class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtCookieMiddleware)
      .exclude({
        path: '/v1/auth/oauth/google',
        method: RequestMethod.GET,
      })
      .forRoutes('*');
  }
}
