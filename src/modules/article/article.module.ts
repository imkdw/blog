import { ClassProvider, Module } from '@nestjs/common';
import { ArticleRepositoryKey, ArticleSchedulerKey, ArticleServiceKey } from './interfaces/article.interface';
import ArticleService from './service/article.service';
import ArticleRepository from './repository/article.repository';
import ArticleController from './controller/article.controller';
import PrismaModule from '../../infra/database/prisma/prisma.module';
import CategoryModule from '../category/category.module';
import ArticleTagModule from '../article-tag/article-tag.module';
import TagModule from '../tag/tag.module';
import { ArticleCommentRepositoryKey, ArticleCommentServiceKey } from './interfaces/article-comment.interface';
import ArticleCommentService from './service/article-comment.service';
import ArticleCommentRepository from './repository/article-comment.repository';
import { ArticleCategoryRepositoryKey, ArticleCategoryServiceKey } from './interfaces/article-category.interface';
import ArticleCategoryService from './service/article-category.service';
import ArticleCategoryRepository from './repository/article-category.repository';
import { ArticleLikeRepositoryKey, ArticleLikeServiceKey } from './interfaces/article-like.interface';
import ArticleLikeService from './service/article-like.service';
import ArticleLikeRepository from './repository/article-like.repository';
import ArticleCommentController from './controller/article-comment.controller';
import AwsModule from '../../infra/aws/aws.module';
import ArticleScheduler from './schedulers/article.scheduler';
import { ArticleTrendServiceKey, ArticleViewTrendRepositoryKey } from './interfaces/article-view-trend.interface';
import ArticleViewTrendRepository from './repository/article-view-trend.repository';
import ArticleTrendService from './service/article-trend.service';
import ArticleTrendController from './controller/article-trend.controller';

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

/** 아티클 좋아요 관련 프로바이더 */
const ArticleLikeServiceProvider: ClassProvider = {
  provide: ArticleLikeServiceKey,
  useClass: ArticleLikeService,
};
const ArticleLikeRepositoryProvider: ClassProvider = {
  provide: ArticleLikeRepositoryKey,
  useClass: ArticleLikeRepository,
};

const ArticleSchedulerProvider: ClassProvider = {
  provide: ArticleSchedulerKey,
  useClass: ArticleScheduler,
};

const ArticleViewTrendRepositoryProvider: ClassProvider = {
  provide: ArticleViewTrendRepositoryKey,
  useClass: ArticleViewTrendRepository,
};

/** 아티클 좋아요 관련 프로바이더 */
const ArticleTrendServiceProvider: ClassProvider = {
  provide: ArticleTrendServiceKey,
  useClass: ArticleTrendService,
};

@Module({
  imports: [PrismaModule, CategoryModule, ArticleTagModule, TagModule, AwsModule],
  controllers: [ArticleController, ArticleCommentController, ArticleTrendController],
  providers: [
    ArticleServiceProvider,
    ArticleRepositoryProbvider,
    ArticleCommentServiceProvicer,
    ArticleCommentRepositoryProvider,
    ArticleCategoryServiceProvider,
    ArticleCategoryRepositoryProvider,
    ArticleLikeServiceProvider,
    ArticleLikeRepositoryProvider,
    ArticleSchedulerProvider,
    ArticleViewTrendRepositoryProvider,
    ArticleTrendServiceProvider,
  ],
})
export default class ArticleModule {}
