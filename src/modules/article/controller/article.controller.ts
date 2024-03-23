import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ArticleMapperKey, ArticleServiceKey, IArticleMapper, IArticleService } from '../interfaces/article.interface';
import * as Swagger from '../docs/article.swagger';
import Admin from '../../auth/decorators/admin.decorator';
import { RequestCreateArticleDto } from '../dto/request/article.dto';
import Requester from '../../../common/decorators/requester.decorator';
import { IRequester } from '../../../common/interfaces/common.interface';
import {
  ResponseCreateArticleDto,
  ResponseGetArticleDetailDto,
  ResponseGetArticleTagsDto,
} from '../dto/response/article.dto';
import { Public } from '../../auth/decorators/public.decorator';
import { RequestCreateCommentDto } from '../dto/request/article-comment.dto';
import { ResponseCreateCommentDto, ResponseGetCommentsDto } from '../dto/response/article-comment.dto';

@Controller({ path: 'articles', version: '1' })
export default class ArticleController {
  constructor(
    @Inject(ArticleServiceKey) private readonly articleService: IArticleService,
    @Inject(ArticleMapperKey) private readonly articleMapper: IArticleMapper,
  ) {}

  @Swagger.createArticle('게시글 작성')
  @Admin()
  @Post()
  async createArticle(
    @Body() dto: RequestCreateArticleDto,
    @Requester() requester: IRequester,
  ): Promise<ResponseCreateArticleDto> {
    const createdArticle = await this.articleService.createArticle(requester.userId, { ...dto, id: dto.articleId });
    return this.articleMapper.toResponseCreateArticleDto(createdArticle);
  }

  @Swagger.getArticleDetail('게시글 상세정보 조회')
  @Public()
  @Get(':articleId')
  async getArticleDetail(@Param('articleId') articleId: string): Promise<ResponseGetArticleDetailDto> {
    const article = await this.articleService.getArticleDetail(articleId);
    return this.articleMapper.toResponseGetArticleDetailDto(article);
  }

  @Swagger.getArticleTags('특정 게시글 태그목록 조회')
  @Public()
  @Get(':articleId/tags')
  async getArticleTags(@Param('articleId') articleId: string): Promise<ResponseGetArticleTagsDto> {
    const tags = await this.articleService.getArticleTags(articleId);
    return this.articleMapper.toResponseGetArticleTagsDto(tags);
  }

  @Swagger.createComment('댓글 작성')
  @Post(':articleId/comments')
  async createComment(
    @Param(':articleId') articleId: string,
    @Body() dto: RequestCreateCommentDto,
    @Requester() requester: IRequester,
  ): Promise<ResponseCreateCommentDto> {
    const createdComment = await this.articleService.createComment(requester.userId, articleId, dto);
    return this.articleMapper.toResponseCreateCommentDto(createdComment);
  }

  @Swagger.getComments('특정 게시글의 댓글목록 조회')
  @Public()
  @Get(':articleId/comments')
  async getComments(
    @Requester() requester: IRequester,
    @Param('articleId') articleId: string,
  ): Promise<ResponseGetCommentsDto> {
    const commentsWithUser = await this.articleService.getArticleCommentsWithUser(requester?.userId, articleId);
    return commentsWithUser;
  }
}
