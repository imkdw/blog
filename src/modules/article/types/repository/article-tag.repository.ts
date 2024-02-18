import { TX } from '../../../../common/types/prisma';
import ArticleTag from '../../domain/article-tag.entity';

export const ArticleTagRepositorySymbol = Symbol('ArticleTagRepository');

export interface ArticleTagRepository {
  saveArticleTags(articleTags: ArticleTag[], tx?: TX): Promise<void>;
}
