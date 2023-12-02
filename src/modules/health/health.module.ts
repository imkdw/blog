import { TerminusModule } from '@nestjs/terminus';
import { Module } from '@nestjs/common';
import HealthController from './controller/health.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController],
})
export default class HealthModule {}
