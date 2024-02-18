import { Module, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import AppController from './app.controller';
import AuthModule from './modules/auth/auth.module';
import ArticleModule from './modules/article/article.module';
import CategoryModule from './modules/category/category.module';
import TagModule from './modules/tag/tag.module';
import AuthGuard from './modules/auth/guards/auth.guard';
import UserModule from './modules/user/user.module';

@Module({
  imports: [AuthModule, ArticleModule, ConfigModule.forRoot({ isGlobal: true }), CategoryModule, TagModule, UserModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        stopAtFirstError: true,
      }),
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export default class AppModule {}
