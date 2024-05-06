import { Module } from '@nestjs/common';
import TagService from './service/tag.service';
import TagRepository from './repository/tag.repository';
import TagController from './controller/tag.controller';
import PrismaModule from '../../infra/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TagController],
  providers: [TagService, TagRepository],
  exports: [TagService],
})
export default class TagModule {}
