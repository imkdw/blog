import { ClassProvider, Module } from '@nestjs/common';
import { ArticleServiceSymbol } from './types/service/article.service';
import ArticleServiceImpl from './service/article-impl.service';
import ArticleController from './controller/article.controller';
import { ArticleRepositorySymbol } from './types/repository/article.repository';
import PrismaModule from '../../infra/database/prisma/prisma.module';
import CategoryModule from '../category/category.module';
import ArticlePrismaRepository from './repository/article-prisma.repository';
import { ArticleCategoryRepositorySymbol } from './types/repository/article-category.repository';
import ArticleCategoryPrismaRepository from './repository/article-category-prisma.repository';
import ArticleTagModule from '../article-tag/article-tag.module';
import TagModule from '../tag/tag.module';
import UserModule from '../user/user.module';

const ArticleServiceProvider: ClassProvider = {
  provide: ArticleServiceSymbol,
  useClass: ArticleServiceImpl,
};

const ArticleRepositoryProvider: ClassProvider = {
  provide: ArticleRepositorySymbol,
  useClass: ArticlePrismaRepository,
};

const ArticleCategoryRepositoryProvider: ClassProvider = {
  provide: ArticleCategoryRepositorySymbol,
  useClass: ArticleCategoryPrismaRepository,
};

@Module({
  imports: [CategoryModule, PrismaModule, ArticleTagModule, TagModule, UserModule],
  controllers: [ArticleController],
  providers: [ArticleServiceProvider, ArticleRepositoryProvider, ArticleCategoryRepositoryProvider],
  exports: [ArticleServiceProvider],
})
export default class ArticleModule {}
