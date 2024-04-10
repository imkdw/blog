import { ClassProvider, Module } from '@nestjs/common';
import { TagRepositoryKey, TagServiceKey } from './interfaces/tag.interface';
import TagService from './service/tag.service';
import TagRepository from './repository/tag.repository';
import TagController from './controller/tag.controller';
import PrismaModule from '../../infra/database/prisma/prisma.module';

const TagServiceProvider: ClassProvider = {
  provide: TagServiceKey,
  useClass: TagService,
};

const TagRepositoryProvider: ClassProvider = {
  provide: TagRepositoryKey,
  useClass: TagRepository,
};

@Module({
  imports: [PrismaModule],
  controllers: [TagController],
  providers: [TagServiceProvider, TagRepositoryProvider],
  exports: [TagServiceKey],
})
export default class TagModule {}
