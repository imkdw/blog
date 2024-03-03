import { ClassProvider, Module } from '@nestjs/common';
import { ArticleTagServiceSymbol } from './types/service/article-tag.service';
import ArticleTagServiceImpl from '../article/service/article-tag-impl.service';
import { ArticleTagRepositorySymbol } from './types/repository/article-tag.repository';
import ArticleTagPrismaRepository from './repository/article-tag-prisma.repository';
import PrismaModule from '../../infra/database/prisma/prisma.module';

const ArticleTagServiceProvider: ClassProvider = {
  provide: ArticleTagServiceSymbol,
  useClass: ArticleTagServiceImpl,
};

const ArticleTagRepositoryProvider: ClassProvider = {
  provide: ArticleTagRepositorySymbol,
  useClass: ArticleTagPrismaRepository,
};

@Module({
  imports: [PrismaModule],
  providers: [ArticleTagServiceProvider, ArticleTagRepositoryProvider],
  exports: [ArticleTagServiceProvider],
})
export default class ArticleTagModule {}
