import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import AppController from './app.controller';
import AuthModule from './modules/auth/auth.module';
import ArticleModule from './modules/article/article.module';
import CategoryModule from './modules/category/category.module';
import TagModule from './modules/tag/tag.module';

@Module({
  imports: [AuthModule, ArticleModule, ConfigModule.forRoot({ isGlobal: true }), CategoryModule, TagModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        stopAtFirstError: true,
      }),
    },
  ],
})
export default class AppModule {}
