import { TX } from '../../../../common/types/prisma';
import ArticleComment from '../../../article/domain/article-comment.entity';

export const ArticleCommentRepositorySymbol = Symbol('ArticleCommentRepository');

export interface ArticleCommentRepository {
  findManyByArticleId(articleId: string): Promise<ArticleComment[]>;

  saveArticleComment(articleComment: ArticleComment, tx?: TX): Promise<void>;
}
