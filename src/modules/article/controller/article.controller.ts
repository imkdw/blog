import { Body, Controller, Get, Inject, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ArticleService, ArticleServiceSymbol } from '../types/service/article.service';
import RequestCreateArticleDto from '../types/dto/request/create-article.dto';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRoles } from '../../user/domain/user.entity';
import AdminGuard from '../../auth/guards/admin.guard';
import User, { IUser } from '../../../common/decorators/user.decorator';
import ResponseCreateArticleDto from '../types/dto/response/create-article.dto';
import * as Swagger from '../docs/article.swagger';
import ResponseCheckArticleIdDto from '../types/dto/response/check-article-id.dto';
import { Public } from '../../../common/decorators/public.decorator';
import RequestGetArticlesQuery from '../types/dto/request/get-articles.dto';
import ResponseGetArticlesDto, { GetArticlesDto } from '../types/dto/response/get-articles.dto';
import ResponseGetArticleDetailDto from '../types/dto/response/get-article-detail.dto';

@ApiTags('게시글')
@Controller({ path: 'articles', version: '1' })
export default class ArticleController {
  constructor(@Inject(ArticleServiceSymbol) private readonly articleService: ArticleService) {}

  @Swagger.createArticle('게시글 생성')
  @Post()
  @UseGuards(AdminGuard)
  @Roles(UserRoles.ADMIN)
  async createArticle(@Body() dto: RequestCreateArticleDto, @User() user: IUser): Promise<ResponseCreateArticleDto> {
    const createdArticle = await this.articleService.createArticle(dto, user.userId);
    return { id: createdArticle.id };
  }

  @Swagger.getArticleDetail('게시글 상세 조회')
  @Get(':articleId')
  @Public()
  async getArticleDetail(@Param('articleId') articleId: string): Promise<ResponseGetArticleDetailDto> {
    const article = await this.articleService.getArticleDetail(articleId);

    return {
      id: article.id,
      title: article.title,
      summary: article.summary,
      content: article.content,
      thumbnail: article.thumbnail,
      createAt: article.createAt,
      commentCount: article.commentCount,
    };
  }

  @Swagger.checkArticleId('게시글 아이디 중복체크')
  @Get('check')
  @UseGuards(AdminGuard)
  @Roles(UserRoles.ADMIN)
  async checkArticleId(@Query('articleId') articleId: string): Promise<ResponseCheckArticleIdDto> {
    const isExistArticleId = await this.articleService.checkArticleId(articleId);
    return { isExist: isExistArticleId };
  }

  @Swagger.getArticles('게시글 목록 조회')
  @Get()
  @Public()
  async getArticles(@Query() query: RequestGetArticlesQuery): Promise<ResponseGetArticlesDto> {
    const articles = await this.articleService.findArticlesByParam(query.categoryParam);

    const responseDto = articles.map(
      (article): GetArticlesDto => ({
        id: article.id,
        title: article.title,
        content: article.content,
        thumbnail: article.thumbnail,
        commentCount: article.commentCount,
        likeCount: article.likeCount,
        createdAt: article.createAt,
      }),
    );

    return { articles: responseDto };
  }
}
