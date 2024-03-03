import { articleTag } from '@prisma/client';
import ArticleTag from '../domain/article-tag.entity';

// eslint-disable-next-line import/prefer-default-export
export function toArticleTag(_articleTag: articleTag): ArticleTag {
  return _articleTag;
}
