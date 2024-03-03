import { ClassProvider, Module } from '@nestjs/common';
import ArticleCommentImplService from './service/article-comment-impl.service';
import { ArticleCommentServiceSymbol } from './types/service/article-comment.service';
import { ArticleCommentRepositorySymbol } from './types/repository/article-comment.repository';
import ArticleCommentPrismaRepository from './repository/article-comment-prisma.repository';
import PrismaModule from '../../infra/database/prisma/prisma.module';
import UserModule from '../user/user.module';
import ArticleModule from '../article/article.module';
import ArticleCommentController from './controller/article-comment.controller';

const ArticleCommentServiceProvider: ClassProvider = {
  provide: ArticleCommentServiceSymbol,
  useClass: ArticleCommentImplService,
};

const ArticleCommentRepositoryProvider: ClassProvider = {
  provide: ArticleCommentRepositorySymbol,
  useClass: ArticleCommentPrismaRepository,
};

@Module({
  controllers: [ArticleCommentController],
  imports: [PrismaModule, UserModule, ArticleModule],
  providers: [ArticleCommentServiceProvider, ArticleCommentRepositoryProvider],
  exports: [ArticleCommentServiceProvider],
})
export default class ArticleCommentModule {}
