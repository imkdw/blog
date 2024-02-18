import { TX } from '../../../../common/types/prisma';
import Article from '../../domain/article.entity';

export const ArticleRepositorySymbol = Symbol('ArticleRepository');
export interface ArticleRepository {
  findById(articleId: string): Promise<Article | null>;

  createArticle(article: Article, tx?: TX): Promise<Article>;
}
