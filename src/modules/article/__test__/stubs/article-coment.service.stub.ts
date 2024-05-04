/* eslint-disable @typescript-eslint/no-unused-vars */
import { TX } from '../../../../common/types/prisma';
import { UserBuilder } from '../../../user/entities/user.entity';
import { CreateCommentDto, DeleteCommentDto, UpdateCommentDto } from '../../dto/internal/article-comment.dto';
import ArticleComment, { ArticleCommentBuilder } from '../../entities/article-comment/article-comment.entity';
import { ArticleCommentsWithUser, IArticleCommentService } from '../../interfaces/article-comment.interface';

export default class ArticleCommentServiceStub implements IArticleCommentService {
  isCallDeleteComment = false;
  isCallDeleteComments = false;
  isCallUpdateComment = false;

  async createComment(userId: string, articleId: string, dto: CreateCommentDto, tx: TX): Promise<ArticleComment> {
    return new ArticleCommentBuilder().articleId(articleId).userId(userId).content(dto.content).build();
  }

  async deleteComment(userId: string, dto: DeleteCommentDto): Promise<void> {
    this.isCallDeleteComment = true;
  }

  async deleteComments(commentIds: number[], tx: TX): Promise<void> {
    this.isCallDeleteComments = true;
  }

  async getArticleComments(articleId: string): Promise<ArticleCommentsWithUser[]> {
    if (articleId === '999') return [];

    const articleComment = new ArticleCommentBuilder().build();
    const user = new UserBuilder().build();
    return [
      {
        ...articleComment,
        user,
      },
    ];
  }

  async updateComment(userId: string, dto: UpdateCommentDto): Promise<void> {
    this.isCallUpdateComment = true;
  }

  reset() {
    this.isCallDeleteComment = false;
    this.isCallDeleteComments = false;
    this.isCallUpdateComment = false;
  }
}
