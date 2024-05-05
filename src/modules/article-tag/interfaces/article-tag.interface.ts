import { articleTag } from '@prisma/client';
import { TX } from '../../../common/types/prisma';
import ArticleTag from '../domain/article-tag.domain';
import { FindOption } from '../../../common/interfaces/find-option.interface';

export const ArticleTagServiceKey = Symbol('ArticleTagService');
export interface IArticleTagService {
  createMany(articleId: string, tagIds: number[], tx: TX): Promise<void>;
  deleteByTagIds(tagIds: number[], tx: TX): Promise<void>;
  deleteManyByArticleId(articleId: string, tx?: TX): Promise<void>;
  findManyByArticleId(articleId: string, option?: FindOption): Promise<ArticleTag[]>;
}

export const ArticleTagRepositoryKey = Symbol('ArticleTagRepository');
export interface IArticleTagRepository {
  createMany(data: ArticleTag[], tx: TX): Promise<void>;
  deleteByTagIds(tagIds: number[], tx: TX): Promise<void>;
  deleteManyByArticleId(articleId: string, tx?: TX): Promise<void>;
  findManyByArticleId(articleId: string, option?: FindOption): Promise<ArticleTag[]>;
}

export const ArticleTagMapperKey = Symbol('ArticleTagMapper');
export interface IArticleTagMapper {
  toArticleTag(data: articleTag): ArticleTag;
}
