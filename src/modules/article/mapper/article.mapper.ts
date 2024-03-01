import { articles } from '@prisma/client';
import Article from '../domain/article.entity';

// eslint-disable-next-line import/prefer-default-export
export function toArticle(_article: articles): Article {
  return _article;
}
