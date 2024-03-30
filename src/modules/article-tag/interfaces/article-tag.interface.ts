import { articleTag } from '@prisma/client';
import { TX } from '../../../common/types/prisma';
import ArticleTag from '../domain/entities/article-tag.entity';
import CreatingArticleTag from '../domain/models/creating-article-tag.model';
import { FindOption } from '../../../common/interfaces/find-option.interface';

export const ArticleTagServiceKey = Symbol('ArticleTagService');
export interface IArticleTagService {
  createMany(articleId: string, tagIds: number[], tx: TX): Promise<void>;
  findManyByArticleId(articleId: string, option: FindOption): Promise<ArticleTag[]>;
  deleteManyByArticleId(articleId: string, tx: TX): Promise<void>;
}

export const ArticleTagRepositoryKey = Symbol('ArticleTagRepository');
export interface IArticleTagRepository {
  createMany(data: CreatingArticleTag[], tx: TX): Promise<void>;
  findManyByArticleId(articleId: string, option: FindOption): Promise<ArticleTag[]>;
  deleteManyByArticleId(articleId: string, tx: TX): Promise<void>;
}

export const ArticleTagMapperKey = Symbol('ArticleTagMapper');
export interface IArticleTagMapper {
  toArticleTag(data: articleTag): ArticleTag;
}
