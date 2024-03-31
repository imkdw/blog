import { FindOption } from '../../../common/interfaces/find-option.interface';
import { TX } from '../../../common/types/prisma';
import ArticleCategory from '../domain/entities/article-category.entity';
import CreatingArticleCategory from '../domain/models/creating-article-category.model';

export const ArticleCategoryServiceKey = Symbol('IArticleCategoryService');
export interface IArticleCategoryService {
  create(articleId: string, categoryId: number, tx: TX): Promise<void>;
  findMany(dto: Partial<ArticleCategory>, option: FindOption): Promise<ArticleCategory[]>;
  deleteByArticleId(articleId: string, tx: TX): Promise<void>;
}

export const ArticleCategoryRepositoryKey = Symbol('IArticleCategoryRepository');
export interface IArticleCategoryRepository {
  save(data: CreatingArticleCategory, tx: TX): Promise<void>;
  findMany(dto: Partial<ArticleCategory>, option: FindOption): Promise<ArticleCategory[]>;
  deleteByArticleId(articleId: string, tx: TX): Promise<void>;
}
