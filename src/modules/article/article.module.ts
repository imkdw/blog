import { ClassProvider, Module } from '@nestjs/common';
import { ArticleServiceSymbol } from './types/service/article.service';
import ArticleServiceImpl from './service/article-impl.service';
import ArticleController from './controller/article.controller';
import { ArticleRepositorySymbol } from './types/repository/article.repository';
import PrismaModule from '../../infra/database/prisma/prisma.module';
import CategoryModule from '../category/category.module';
import TagModule from '../tag/tag.module';
import ArticlePrismaRepository from './repository/article-prisma.repository';
import { ArticleTagServiceSymbol } from './types/service/article-tag.service';
import ArticleTagServiceImpl from './service/article-tag-impl.service';
import { ArticleTagRepositorySymbol } from './types/repository/article-tag.repository';
import ArticleTagPrismaRepository from './repository/article-tag-prisma.repository';
import { ArticleCategoryRepositorySymbol } from './types/repository/article-category.repository';
import ArticleCategoryPrismaRepository from './repository/article-category-prisma.repository';

const ArticleServiceProvider: ClassProvider = {
  provide: ArticleServiceSymbol,
  useClass: ArticleServiceImpl,
};

const ArticleRepositoryProvider: ClassProvider = {
  provide: ArticleRepositorySymbol,
  useClass: ArticlePrismaRepository,
};

const ArticleTagServiceProvider: ClassProvider = {
  provide: ArticleTagServiceSymbol,
  useClass: ArticleTagServiceImpl,
};

const ArticleTagRepositoryProvider: ClassProvider = {
  provide: ArticleTagRepositorySymbol,
  useClass: ArticleTagPrismaRepository,
};

const ArticleCategoryRepositoryProvider: ClassProvider = {
  provide: ArticleCategoryRepositorySymbol,
  useClass: ArticleCategoryPrismaRepository,
};

@Module({
  imports: [CategoryModule, TagModule, PrismaModule],
  controllers: [ArticleController],
  providers: [
    ArticleServiceProvider,
    ArticleRepositoryProvider,
    ArticleTagServiceProvider,
    ArticleTagRepositoryProvider,
    ArticleCategoryRepositoryProvider,
  ],
})
export default class ArticleModule {}
