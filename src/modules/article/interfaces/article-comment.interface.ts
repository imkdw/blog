import { articleComment, users } from '@prisma/client';

import { CreateCommentDto } from '../dto/internal/article-comment.dto';
import ArticleComment from '../domain/entities/article-comment.entity';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import { TX } from '../../../common/types/prisma';
import CreatingArticleComment from '../domain/models/creating-article-comment.model';

export const ArticleCommentServiceKey = Symbol('IArticleCommentService');
export interface IArticleCommentService {
  createComment(userId: string, articleId: string, dto: CreateCommentDto, tx: TX): Promise<ArticleComment>;
  getArticleComments(articleId: string): Promise<ArticleCommentsWithUser[]>;
}

export const ArticleCommentRepositoryKey = Symbol('IArticleCommentRepository');
export interface IArticleCommentRepository {
  save(data: CreatingArticleComment, tx: TX): Promise<ArticleComment>;

  /**
   * 게시글 아이디로 댓글 목록을 조회한다.
   * 댓글 작성자에 대한 정보도 같이 조회한다.
   *
   * @param articleId - 게시글 아이디
   * @param option - 검색 옵션
   */
  findManyByArticeIdWithUser(articleId: string, option: FindOption): Promise<ArticleCommentsWithUser[]>;
}

export interface ArticleCommentsWithUser extends articleComment {
  user: users;
}
