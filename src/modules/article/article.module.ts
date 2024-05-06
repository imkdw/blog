import { Module } from '@nestjs/common';
import ArticleService from './service/article.service';
import ArticleRepository from './repository/article.repository';
import ArticleController from './controller/article.controller';
import PrismaModule from '../../infra/database/prisma/prisma.module';
import CategoryModule from '../category/category.module';
import ArticleTagModule from '../article-tag/article-tag.module';
import TagModule from '../tag/tag.module';
import ArticleCommentService from './service/article-comment.service';
import ArticleCommentRepository from './repository/article-comment.repository';
import ArticleCategoryService from './service/article-category.service';
import ArticleCategoryRepository from './repository/article-category.repository';
import ArticleLikeService from './service/article-like.service';
import ArticleLikeRepository from './repository/article-like.repository';
import ArticleCommentController from './controller/article-comment.controller';
import AwsModule from '../../infra/aws/aws.module';
import ArticleScheduler from './schedulers/article.scheduler';
import ArticleViewTrendRepository from './repository/article-view-trend.repository';
import ArticleTrendService from './service/article-trend.service';
import ArticleTrendController from './controller/article-trend.controller';

@Module({
  imports: [PrismaModule, CategoryModule, ArticleTagModule, TagModule, AwsModule],
  controllers: [ArticleController, ArticleCommentController, ArticleTrendController],
  providers: [
    ArticleService,
    ArticleRepository,
    ArticleCommentService,
    ArticleCommentRepository,
    ArticleCategoryService,
    ArticleCategoryRepository,
    ArticleLikeService,
    ArticleLikeRepository,
    ArticleScheduler,
    ArticleViewTrendRepository,
    ArticleTrendService,
  ],
})
export default class ArticleModule {}
