import { Body, Controller, Delete, Param, Patch } from '@nestjs/common';
import * as Swagger from '../docs/articlec-comment.swagger';
import { ReqeustUpdateCommentDto, ReqeustUpdateCommentParam } from '../dto/request/article-comment.dto';
import Requester from '../../../common/decorators/requester.decorator';
import { IRequester } from '../../../common/interfaces/common.interface';
import ArticleCommentService from '../service/article-comment.service';

@Controller({ path: 'articles/:articleId/comments', version: '1' })
export default class ArticleCommentController {
  constructor(private readonly articleCommentService: ArticleCommentService) {}

  @Swagger.updateComment('게시글 댓글 수정')
  @Patch(':commentId')
  async updateComment(
    @Requester() requester: IRequester,
    @Param() param: ReqeustUpdateCommentParam,
    @Body() dto: ReqeustUpdateCommentDto,
  ): Promise<void> {
    await this.articleCommentService.updateComment(requester.userId, {
      articleId: param.articleId,
      commentId: param.commentId,
      content: dto.content,
    });
  }

  @Swagger.deleteComment('게시글 댓글 삭제')
  @Delete(':commentId')
  async deleteComment(@Requester() requester: IRequester, @Param() param: ReqeustUpdateCommentParam): Promise<void> {
    await this.articleCommentService.deleteComment(requester.userId, {
      articleId: param.articleId,
      commentId: param.commentId,
    });
  }
}
