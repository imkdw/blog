import { Inject, Injectable } from '@nestjs/common';
import {
  ArticleCommentRepository,
  ArticleCommentRepositorySymbol,
} from '../types/repository/article-comment.repository';
import { ArticleCommentService } from '../types/service/article-comment.service';
import ArticleComment from '../../article/domain/article-comment.entity';
import { UserService, UserServiceSymbol } from '../../user/types/service/user.service';
import { GetArticleCommentsResult } from '../types/dto/internal/get-article-comments.dto';
import { CreateArticleCommentDto } from '../types/dto/internal/create-article-comment.dto';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { ArticleService, ArticleServiceSymbol } from '../../article/types/service/article.service';

@Injectable()
export default class ArticleCommentImplService implements ArticleCommentService {
  constructor(
    @Inject(ArticleCommentRepositorySymbol) private readonly articleCommentRepository: ArticleCommentRepository,
    @Inject(UserServiceSymbol) private readonly userService: UserService,
    @Inject(ArticleServiceSymbol) private readonly articleService: ArticleService,
    private readonly prisma: PrismaService,
  ) {}

  async findManyByArticleId(articleId: string): Promise<ArticleComment[]> {
    const comments = await this.articleCommentRepository.findManyByArticleId(articleId);
    return comments;
  }

  async getArticleComments(articleId: string): Promise<GetArticleCommentsResult[]> {
    const comments = await this.findManyByArticleId(articleId);
    const writerUserIds = comments.map((comment) => comment.userId);

    const users = await this.userService.findManyByIds(writerUserIds);
    const commentsWithUser = comments.map((comment): GetArticleCommentsResult => {
      const writer = users.find((user) => user.id === comment.userId);
      return {
        id: comment.id,
        content: comment.content,
        createAt: comment.createAt,
        user: {
          profile: writer.profile,
          nickname: writer.nickname,
          isWriter: writer.id === comment.userId,
        },
      };
    });

    return commentsWithUser;
  }

  async createArticleComment(articleId: string, dto: CreateArticleCommentDto): Promise<void> {
    const { userId, content } = dto;
    const comment = new ArticleComment({
      articleId,
      userId,
      content,
      createUser: userId,
      updateUser: userId,
    });

    await this.prisma.$transaction(async (tx) => {
      const saveComment = this.articleCommentRepository.saveArticleComment(comment, tx);
      const updateCommentCount = this.articleService.addArticleCommentCount(articleId, tx);
      await Promise.all([saveComment, updateCommentCount]);
    });
  }
}
