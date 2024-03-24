import { ClassProvider, Module } from '@nestjs/common';
import { ArticleTagMapperKey, ArticleTagRepositoryKey, ArticleTagServiceKey } from './interfaces/article-tag.interface';
import ArticleTagService from './service/article-tag.service';
import ArticleTagRepository from './repository/article-tag.repository';
import PrismaModule from '../../infra/database/prisma/prisma.module';
import ArticleTagMapper from './mapper/article-tag.mapper';

const ArticleTagServiceProvider: ClassProvider = {
  provide: ArticleTagServiceKey,
  useClass: ArticleTagService,
};

const ArticleTagRepositoryProvider: ClassProvider = {
  provide: ArticleTagRepositoryKey,
  useClass: ArticleTagRepository,
};

const ArticleTagMapperProvider: ClassProvider = {
  provide: ArticleTagMapperKey,
  useClass: ArticleTagMapper,
};

@Module({
  imports: [PrismaModule],
  providers: [ArticleTagServiceProvider, ArticleTagRepositoryProvider, ArticleTagMapperProvider],
  exports: [ArticleTagServiceProvider],
})
export default class ArticleTagModule {}
