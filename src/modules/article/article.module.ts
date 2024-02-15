import { ClassProvider, Module } from '@nestjs/common';
import { ArticleServiceSymbol } from './types/article.service';
import ArticleServiceImpl from './service/article-impl.service';
import ArticleController from './controller/article.controller';
import { ArticleRepositorySymbol } from './types/article.repository';
import ArticleMemoryRepository from './repository/article-memory.repository';

const ArticleServiceProvider = {
  provide: ArticleServiceSymbol,
  useClass: ArticleServiceImpl,
};

const ArticleRepositoryProvider: ClassProvider = {
  provide: ArticleRepositorySymbol,
  useClass: ArticleMemoryRepository,
};

@Module({
  controllers: [ArticleController],
  providers: [ArticleServiceProvider, ArticleRepositoryProvider],
})
export default class ArticleModule {}
