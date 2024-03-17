import { Module } from '@nestjs/common';
import PrismaService from './service/prisma.service';
import LocalStorageModule from '../../local-storage/local-storage.module';

@Module({
  imports: [LocalStorageModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export default class PrismaModule {}
