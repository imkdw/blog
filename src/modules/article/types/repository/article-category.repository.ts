import { TX } from '../../../../common/types/prisma';
import ArticleCategory from '../../domain/article-category.entity';

export const ArticleCategoryRepositorySymbol = Symbol('ArticleRepository');

export interface ArticleCategoryRepository {
  findManyByCategoryId(categoryId: number): Promise<ArticleCategory[]>;

  saveArticleCategory(articleCategory: ArticleCategory, tx?: TX): Promise<void>;
}
