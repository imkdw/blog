import { Inject, Injectable } from '@nestjs/common';
import {
  ArticleCommentRepositoryKey,
  ArticleCommentsWithUser,
  IArticleCommentRepository,
  IArticleCommentService,
} from '../interfaces/article-comment.interface';
import { CreateCommentDto } from '../dto/internal/article-comment.dto';
import CreatingArticleComment from '../domain/models/creating-article-comment.model';
import ArticleComment from '../domain/entities/article-comment.entity';
import { TX } from '../../../common/types/prisma';

@Injectable()
export default class ArticleCommentService implements IArticleCommentService {
  constructor(
    @Inject(ArticleCommentRepositoryKey) private readonly articleCommentRepository: IArticleCommentRepository,
  ) {}

  async createComment(userId: string, articleId: string, dto: CreateCommentDto, tx: TX): Promise<ArticleComment> {
    const creatingArticleComment = new CreatingArticleComment({
      userId,
      articleId,
      content: dto.content,
    });

    const createdArticleComment = await this.articleCommentRepository.save(creatingArticleComment, tx);
    return createdArticleComment;
  }

  async getArticleComments(articleId: string): Promise<ArticleCommentsWithUser[]> {
    const comments = await this.articleCommentRepository.findManyByArticeIdWithUser(articleId, {
      includeDeleted: false,
    });

    return comments;
  }
}
