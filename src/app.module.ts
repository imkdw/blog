import { Module } from '@nestjs/common';
import AppController from './app.controller';

@Module({
  controllers: [AppController],
})
export default class AppModule {}
