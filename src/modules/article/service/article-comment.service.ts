import { Inject, Injectable } from '@nestjs/common';
import {
  ArticleCommentRepositoryKey,
  ArticleCommentsWithUser,
  IArticleCommentRepository,
  IArticleCommentService,
} from '../interfaces/article-comment.interface';
import { CreateCommentDto, DeleteCommentDto, UpdateCommentDto } from '../dto/internal/article-comment.dto';
import ArticleComment from '../domain/article-comment/article-comment.domain';
import { TX } from '../../../common/types/prisma';
import { ArticleRepositoryKey, IArticleRepository } from '../interfaces/article.interface';
import { ArticleCommentNotFoundException, ArticleNotFoundException } from '../../../common/exceptions/404';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import CreateArticleComment from '../domain/article-comment/create';
import UpdateArticleComment from '../domain/article-comment/update';

@Injectable()
export default class ArticleCommentService implements IArticleCommentService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(ArticleCommentRepositoryKey) private readonly articleCommentRepository: IArticleCommentRepository,
    @Inject(ArticleRepositoryKey) private readonly articleRepository: IArticleRepository,
  ) {}

  async createComment(userId: string, articleId: string, dto: CreateCommentDto, tx: TX): Promise<ArticleComment> {
    const creatingArticleComment = new CreateArticleComment({
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

  async updateComment(userId: string, dto: UpdateCommentDto): Promise<void> {
    const article = await this.articleRepository.findOne({ id: dto.articleId }, { includeDeleted: false });
    if (!article) throw new ArticleNotFoundException();

    const comment = await this.articleCommentRepository.findOne(
      { id: dto.commentId, userId },
      { includeDeleted: false },
    );
    if (!comment) throw new ArticleCommentNotFoundException();

    const updatingArticleComment = new UpdateArticleComment({ content: dto.content });
    await this.articleCommentRepository.update(comment.id, updatingArticleComment);
  }

  async deleteComment(userId: string, dto: DeleteCommentDto): Promise<void> {
    const article = await this.articleRepository.findOne({ id: dto.articleId }, { includeDeleted: false });
    if (!article) throw new ArticleNotFoundException();

    const comment = await this.articleCommentRepository.findOne(
      { id: dto.commentId, userId },
      { includeDeleted: false },
    );
    if (!comment) throw new ArticleCommentNotFoundException();

    await this.prisma.$transaction(async (tx) => {
      const promises = [];
      promises.push(this.articleRepository.update(article.id, { commentCount: article.commentCount - 1 }, tx));
      promises.push(this.articleCommentRepository.delete(comment.id, tx));

      await Promise.all(promises);
    });
  }

  async deleteComments(commentIds: number[], tx: TX): Promise<void> {
    await this.articleCommentRepository.deleteManyByIds(commentIds, tx);
  }
}
