import { CreateCommentDto, DeleteCommentDto, UpdateCommentDto } from '../dto/internal/article-comment.dto';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import { TX } from '../../../common/types/prisma';
import User from '../../user/entities/user.entity';
import ArticleCommentEntity from '../entities/article-comment/article-comment.entity';

export const ArticleCommentServiceKey = Symbol('IArticleCommentService');
export interface IArticleCommentService {
  createComment(userId: string, articleId: string, dto: CreateCommentDto, tx: TX): Promise<ArticleCommentEntity>;
  deleteComments(commentIds: number[], tx: TX): Promise<void>;
  getArticleComments(articleId: string): Promise<ArticleCommentsWithUser[]>;
  updateComment(userId: string, dto: UpdateCommentDto): Promise<void>;
  deleteComment(userId: string, dto: DeleteCommentDto): Promise<void>;
}

export const ArticleCommentRepositoryKey = Symbol('IArticleCommentRepository');
export interface IArticleCommentRepository {
  save(data: ArticleCommentEntity, tx: TX): Promise<ArticleCommentEntity>;
  update(commentId: number, content: string): Promise<void>;
  delete(commentId: number, tx: TX): Promise<void>;
  deleteManyByIds(ids: number[], tx: TX): Promise<void>;

  /**
   * 게시글 아이디로 댓글 목록을 조회한다.
   * 댓글 작성자에 대한 정보도 같이 조회한다.
   *
   * @param articleId - 게시글 아이디
   * @param option - 검색 옵션
   */
  findManyByArticeIdWithUser(articleId: string, option: FindOption): Promise<ArticleCommentsWithUser[]>;

  findOne(dto: Partial<ArticleCommentEntity>, option: FindOption): Promise<ArticleCommentEntity | null>;
}

export interface ArticleCommentsWithUser extends ArticleCommentEntity {
  user: User;
}
