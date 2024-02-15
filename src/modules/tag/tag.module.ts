import { ClassProvider, Module } from '@nestjs/common';
import { TagServiceSymbol } from './types/tag.service';
import TagServiceImpl from './service/tag-impl.service';
import { TagRepositorySymbol } from './types/tag.repository';
import TagMemoryRepository from './repository/tag-memory.repository';

const TagServiceProvider: ClassProvider = {
  provide: TagServiceSymbol,
  useClass: TagServiceImpl,
};

const TagRepositoryProvider: ClassProvider = {
  provide: TagRepositorySymbol,
  useClass: TagMemoryRepository,
};

@Module({
  providers: [TagServiceProvider, TagRepositoryProvider],
})
export default class TagModule {}
