import { Module } from '@nestjs/common';
import AppController from './app.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import TransformInterceptor from './common/interceptos/transform.interceptor';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useValue: TransformInterceptor,
    },
  ],
})
export default class AppModule {}
