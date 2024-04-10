import { articleTag } from '@prisma/client';
import { TX } from '../../../common/types/prisma';
import ArticleTag from '../domain/article-tag.domain';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import CreateArticleTag from '../domain/create';

export const ArticleTagServiceKey = Symbol('ArticleTagService');
export interface IArticleTagService {
  createMany(articleId: string, tagIds: number[], tx: TX): Promise<void>;
  deleteByTagIds(tagIds: number[], tx: TX): Promise<void>;
  findMany(dto: Partial<ArticleTag>, option: FindOption): Promise<ArticleTag[]>;
  deleteMany(dto: Partial<ArticleTag>, tx: TX): Promise<void>;
}

export const ArticleTagRepositoryKey = Symbol('ArticleTagRepository');
export interface IArticleTagRepository {
  createMany(data: CreateArticleTag[], tx: TX): Promise<void>;
  findMany(dto: Partial<ArticleTag>, option: FindOption): Promise<ArticleTag[]>;
  deleteMany(dto: Partial<ArticleTag>, tx: TX): Promise<void>;
  deleteByTagIds(tagIds: number[], tx: TX): Promise<void>;
}

export const ArticleTagMapperKey = Symbol('ArticleTagMapper');
export interface IArticleTagMapper {
  toArticleTag(data: articleTag): ArticleTag;
}
