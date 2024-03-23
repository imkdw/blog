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
import { ArticleCommentRepositoryKey, ArticleCommentServiceKey } from './interfaces/article-comment.interface';
import ArticleCommentService from './service/article-comment.service';
import ArticleCommentRepository from './repository/article-comment.repository';
import { ArticleCategoryRepositoryKey, ArticleCategoryServiceKey } from './interfaces/article-category.interface';
import ArticleCategoryService from './service/article-category.service';
import ArticleCategoryRepository from './repository/article-category.repository';

/** 아티클 관련 프로바이더 */
const ArticleServiceProvider: ClassProvider = {
  provide: ArticleServiceKey,
  useClass: ArticleService,
};
const ArticleRepositoryProbvider: ClassProvider = {
  provide: ArticleRepositoryKey,
  useClass: ArticleRepository,
};

/** 아티클 댓글 관련 프로바이더 */
const ArticleCommentServiceProvicer: ClassProvider = {
  provide: ArticleCommentServiceKey,
  useClass: ArticleCommentService,
};
const ArticleCommentRepositoryProvider: ClassProvider = {
  provide: ArticleCommentRepositoryKey,
  useClass: ArticleCommentRepository,
};

/** 아티클 카테고리 관련 프로바이더 */
const ArticleCategoryServiceProvider: ClassProvider = {
  provide: ArticleCategoryServiceKey,
  useClass: ArticleCategoryService,
};
const ArticleCategoryRepositoryProvider: ClassProvider = {
  provide: ArticleCategoryRepositoryKey,
  useClass: ArticleCategoryRepository,
};

/** 아티클 매퍼 프로바이더  */
const ArticleMapperProvider: ClassProvider = {
  provide: ArticleMapperKey,
  useClass: ArticleMapper,
};

@Module({
  imports: [PrismaModule, CategoryModule, ArticleTagModule, TagModule],
  controllers: [ArticleController],
  providers: [
    ArticleServiceProvider,
    ArticleRepositoryProbvider,
    ArticleMapperProvider,
    ArticleCommentServiceProvicer,
    ArticleCommentRepositoryProvider,
    ArticleCategoryServiceProvider,
    ArticleCategoryRepositoryProvider,
  ],
})
export default class ArticleModule {}
