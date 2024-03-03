import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ArticleCommentService, ArticleCommentServiceSymbol } from '../types/service/article-comment.service';
import * as Swagger from '../docs/article-comment.swagger';
import ResponseGetArticleCommentsDto from '../../article/types/dto/response/get-article-comments.dto';
import { Public } from '../../../common/decorators/public.decorator';
import User, { IUser } from '../../../common/decorators/user.decorator';
import RequestCreateArticleCommentDto from '../types/dto/request/create-article-comment.dto';

@Controller({ path: 'articles/:articleId/comments', version: '1' })
export default class ArticleCommentController {
  constructor(@Inject(ArticleCommentServiceSymbol) private readonly articleCommentService: ArticleCommentService) {}

  @Swagger.getArticleComments('게시글 댓글 조회')
  @Get()
  @Public()
  async getArticleComments(@Param('articleId') articleId: string): Promise<ResponseGetArticleCommentsDto> {
    const comments = await this.articleCommentService.getArticleComments(articleId);
    return { comments };
  }

  @Swagger.createArticleComment('게시글 댓글 작성')
  @Post()
  async createArticleComment(
    @Param('articleId') articleId: string,
    @Body() dto: RequestCreateArticleCommentDto,
    @User() user: IUser,
  ): Promise<void> {
    const [content, userId] = [dto.content, user.userId];
    await this.articleCommentService.createArticleComment(articleId, { content, userId });
  }
}
