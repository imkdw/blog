import { TX } from '../../../../common/types/prisma';
import ArticleTag from '../../domain/article-tag.entity';

export const ArticleTagServiceSymbol = Symbol('ArticleTagService');

export interface ArticleTagService {
  saveArticleTags(articleTags: ArticleTag[], tx?: TX): Promise<void>;

  findManyByArticleId(articleId: string): Promise<ArticleTag[]>;
}
