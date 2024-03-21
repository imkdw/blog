import { ClassProvider, Module } from '@nestjs/common';
import { ArticleMapperKey, ArticleRepositoryKey, ArticleServiceKey } from './interfaces/article.interface';
import ArticleService from './service/article.service';
import ArticleRepository from './repository/article.repository';
import ArticleController from './controller/article.controller';
import PrismaModule from '../../infra/database/prisma/prisma.module';
import ArticleMapper from './mapper/article.mapper';
import CategoryModule from '../category/category.module';
import ArticleTagModule from '../article-tag/article-tag.module';
import TagModule from '../tag/tag.module';

const ArticleServiceProvider: ClassProvider = {
  provide: ArticleServiceKey,
  useClass: ArticleService,
};

const ArticleRepositoryProbvider: ClassProvider = {
  provide: ArticleRepositoryKey,
  useClass: ArticleRepository,
};

const ArticleMapperProvider: ClassProvider = {
  provide: ArticleMapperKey,
  useClass: ArticleMapper,
};

@Module({
  imports: [PrismaModule, CategoryModule, ArticleTagModule, TagModule],
  controllers: [ArticleController],
  providers: [ArticleServiceProvider, ArticleRepositoryProbvider, ArticleMapperProvider],
})
export default class ArticleModule {}
