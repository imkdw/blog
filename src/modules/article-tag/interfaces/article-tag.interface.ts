import { TX } from '../../../common/types/prisma';
import CreatingArticleTag from '../domain/models/creating-article-tag.model';

export const ArticleTagServiceKey = Symbol('ArticleTagService');
export interface IArticleTagService {
  createMany(articleId: string, tagIds: number[], tx: TX): Promise<void>;
}

export const ArticleTagRepositoryKey = Symbol('ArticleTagRepository');
export interface IArticleTagRepository {
  createMany(data: CreatingArticleTag[], tx: TX): Promise<void>;
}
