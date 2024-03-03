import { articleComment } from '@prisma/client';
import ArticleComment from '../../article/domain/article-comment.entity';

// eslint-disable-next-line import/prefer-default-export
export function toArticleComment(_articleComment: articleComment): ArticleComment {
  return _articleComment;
}
