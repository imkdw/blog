import { ClassProvider, Module } from '@nestjs/common';
import { TagMapperKey, TagRepositoryKey, TagServiceKey } from './interfaces/tag.interface';
import TagService from './service/tag.service';
import TagRepository from './repository/tag.repository';
import TagController from './controller/tag.controller';
import PrismaModule from '../../infra/database/prisma/prisma.module';
import TagMapper from './mapper/tag.mapper';

const TagServiceProvider: ClassProvider = {
  provide: TagServiceKey,
  useClass: TagService,
};

const TagRepositoryProvider: ClassProvider = {
  provide: TagRepositoryKey,
  useClass: TagRepository,
};

const TagMapperProvider: ClassProvider = {
  provide: TagMapperKey,
  useClass: TagMapper,
};

@Module({
  imports: [PrismaModule],
  controllers: [TagController],
  providers: [TagServiceProvider, TagRepositoryProvider, TagMapperProvider],
  exports: [TagServiceKey],
})
export default class TagModule {}
