import { Prisma } from '@prisma/client';
import { TX } from '../../../../common/types/prisma';
import Article from '../../domain/article.entity';

export const ArticleRepositorySymbol = Symbol('ArticleRepository');
export interface ArticleRepository {
  findAll(): Promise<Article[]>;

  findById(articleId: string): Promise<Article | null>;

  findByIds(articleIds: string[]): Promise<Article[]>;

  createArticle(article: Article, tx?: TX): Promise<Article>;

  updateArticle(articleId: string, dto: Prisma.articlesUpdateInput, tx?: TX): Promise<void>;
}
