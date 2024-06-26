import { Injectable } from '@nestjs/common';
import { ArticleCommentsWithUser } from '../interfaces/article-comment.interface';
import { CreateCommentDto, DeleteCommentDto, UpdateCommentDto } from '../dto/internal/article-comment.dto';
import ArticleComment, { ArticleCommentBuilder } from '../entities/article-comment/article-comment.entity';
import { TX } from '../../../common/types/prisma';
import { ArticleCommentNotFoundException, ArticleNotFoundException } from '../../../common/exceptions/404';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import ArticleCommentRepository from '../repository/article-comment.repository';
import ArticleRepository from '../repository/article.repository';

@Injectable()
export default class ArticleCommentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly articleCommentRepository: ArticleCommentRepository,
    private readonly articleRepository: ArticleRepository,
  ) {}

  async createComment(userId: string, articleId: string, dto: CreateCommentDto, tx: TX): Promise<ArticleComment> {
    const articleComment = new ArticleCommentBuilder().userId(userId).articleId(articleId).content(dto.content).build();

    const createdArticleComment = await this.articleCommentRepository.save(articleComment, tx);
    return createdArticleComment;
  }

  async getArticleComments(articleId: string): Promise<ArticleCommentsWithUser[]> {
    const comments = await this.articleCommentRepository.findManyByArticeIdWithUser(articleId, {
      includeDeleted: false,
    });

    return comments;
  }

  async updateComment(userId: string, dto: UpdateCommentDto): Promise<void> {
    const article = await this.articleRepository.findById(dto.articleId);
    if (!article) throw new ArticleNotFoundException();

    const comment = await this.articleCommentRepository.findById(dto.commentId);
    if (!comment) throw new ArticleCommentNotFoundException();
    comment.checkAuthor(userId);

    await this.articleCommentRepository.update(comment.id, dto.content);
  }

  async deleteComment(userId: string, dto: DeleteCommentDto): Promise<void> {
    const article = await this.articleRepository.findById(dto.articleId);
    if (!article) throw new ArticleNotFoundException();

    const comment = await this.articleCommentRepository.findById(dto.commentId);
    if (!comment) throw new ArticleCommentNotFoundException();
    comment.checkAuthor(userId);

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
