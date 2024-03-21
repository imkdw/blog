import { ClassProvider, Module } from '@nestjs/common';
import { ArticleTagRepositoryKey, ArticleTagServiceKey } from './interfaces/article-tag.interface';
import ArticleTagService from './service/article-tag.service';
import ArticleTagRepository from './repository/article-tag.repository';
import PrismaModule from '../../infra/database/prisma/prisma.module';

const ArticleTagServiceProvider: ClassProvider = {
  provide: ArticleTagServiceKey,
  useClass: ArticleTagService,
};

const ArticleTagRepositoryProvider: ClassProvider = {
  provide: ArticleTagRepositoryKey,
  useClass: ArticleTagRepository,
};

@Module({
  imports: [PrismaModule],
  providers: [ArticleTagServiceProvider, ArticleTagRepositoryProvider],
  exports: [ArticleTagServiceProvider],
})
export default class ArticleTagModule {}
