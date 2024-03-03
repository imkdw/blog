import { ClassProvider, Module } from '@nestjs/common';
import { TagServiceSymbol } from './types/tag.service';
import TagServiceImpl from './service/tag-impl.service';
import { TagRepositorySymbol } from './types/tag.repository';
import TagPrismaRepository from './repository/tag-prisma.repository';
import TagController from './controller/tag.controller';
import PrismaModule from '../../infra/database/prisma/prisma.module';
import ArticleTagModule from '../article-tag/article-tag.module';

const TagServiceProvider: ClassProvider = {
  provide: TagServiceSymbol,
  useClass: TagServiceImpl,
};

const TagRepositoryProvider: ClassProvider = {
  provide: TagRepositorySymbol,
  useClass: TagPrismaRepository,
};

@Module({
  imports: [PrismaModule, ArticleTagModule],
  controllers: [TagController],
  providers: [TagServiceProvider, TagRepositoryProvider],
  exports: [TagServiceProvider],
})
export default class TagModule {}
