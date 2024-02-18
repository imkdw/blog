import { article } from '@prisma/client';
import Article from '../domain/article.entity';

// eslint-disable-next-line import/prefer-default-export
export function toArticle(_article: article): Article {
  return _article;
}
