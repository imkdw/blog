import { Module } from '@nestjs/common';
import AppController from './app.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import TransformInterceptor from './common/interceptos/transform.interceptor';
import HealthModule from './modules/health/health.module';

@Module({
  imports: [HealthModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useValue: TransformInterceptor,
    },
  ],
})
export default class AppModule {}
