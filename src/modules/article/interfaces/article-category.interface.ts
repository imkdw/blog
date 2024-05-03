import { FindOption } from '../../../common/interfaces/find-option.interface';
import { TX } from '../../../common/types/prisma';
import ArticleCategory from '../entities/article-category/article-category.entity';

export const ArticleCategoryServiceKey = Symbol('IArticleCategoryService');
export interface IArticleCategoryService {
  create(articleId: string, categoryId: number, tx: TX): Promise<void>;
  findMany(dto: Partial<ArticleCategory>, option: FindOption): Promise<ArticleCategory[]>;
  deleteMany(dto: Partial<ArticleCategory>, tx: TX): Promise<void>;
}

export const ArticleCategoryRepositoryKey = Symbol('IArticleCategoryRepository');
export interface IArticleCategoryRepository {
  save(data: ArticleCategory, tx?: TX): Promise<void>;
  findMany(dto: Partial<ArticleCategory>, option?: FindOption): Promise<ArticleCategory[]>;
  deleteMany(dto: Partial<ArticleCategory>, tx?: TX): Promise<void>;
}
