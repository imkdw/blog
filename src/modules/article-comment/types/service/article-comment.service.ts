import ArticleComment from '../../../article/domain/article-comment.entity';
import { CreateArticleCommentDto } from '../dto/internal/create-article-comment.dto';
import { GetArticleCommentsResult } from '../dto/internal/get-article-comments.dto';

export const ArticleCommentServiceSymbol = Symbol('ArticleCommentService');

export interface ArticleCommentService {
  findManyByArticleId(articleId: string): Promise<ArticleComment[]>;

  getArticleComments(articleId: string): Promise<GetArticleCommentsResult[]>;

  createArticleComment(articleId: string, dto: CreateArticleCommentDto): Promise<void>;
}
