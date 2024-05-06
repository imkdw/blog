import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import * as Swagger from '../docs/article-trend.swagger';
import { Public } from '../../auth/decorators/public.decorator';
import ResponseGetArticleViewTrendDto from '../dto/response/get-article-view-trend.dto';
import ArticleTrendService from '../service/article-trend.service';

@Controller({ path: 'articles/trends', version: '1' })
export default class ArticleTrendController {
  constructor(private readonly articleTrendService: ArticleTrendService) {}

  @Swagger.getArticleViewTrends('게시글 조회수 추이 조회')
  @Get('view')
  @Public()
  async getArticleViewTrends(
    @Query('duration', ParseIntPipe) duration: number,
  ): Promise<ResponseGetArticleViewTrendDto> {
    const viewTrends = await this.articleTrendService.getArticleViewTrends(duration);
    return viewTrends;
  }
}
