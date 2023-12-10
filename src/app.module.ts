import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import HealthModule from './modules/external/health/health.module';
import TransformInterceptor from './interceptors/transform.interceptor';

@Module({
  imports: [HealthModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useValue: TransformInterceptor,
    },
  ],
})
export default class AppModule {}
