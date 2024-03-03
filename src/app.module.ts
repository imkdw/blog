import { ClassProvider, Module, ValidationPipe, ValueProvider } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import AppController from './app.controller';
import AuthModule from './modules/auth/auth.module';
import ArticleModule from './modules/article/article.module';
import CategoryModule from './modules/category/category.module';
import TagModule from './modules/tag/tag.module';
import AuthGuard from './modules/auth/guards/auth.guard';
import UserModule from './modules/user/user.module';
import TransformInterceptor from './common/interceptors/transform.interceptor';
import AllExceptionsFilter from './common/filters/all-exceptions.filter';
import ArticleCommentModule from './modules/article-comment/article-comment.module';

const AuthGuardProvider: ClassProvider = {
  provide: APP_GUARD,
  useClass: AuthGuard,
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
  useClass: AllExceptionsFilter,
};

@Module({
  imports: [
    AuthModule,
    ArticleModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CategoryModule,
    TagModule,
    UserModule,
    ArticleCommentModule,
  ],
  controllers: [AppController],
  providers: [ValidationPipeProvider, AuthGuardProvider, TransformInterceptorProvider, ExceptionFilterProvider],
})
export default class AppModule {}
