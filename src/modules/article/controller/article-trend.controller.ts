import { Controller, Get, Inject, ParseIntPipe, Query } from '@nestjs/common';
import * as Swagger from '../docs/article-trend.swagger';
import { Public } from '../../auth/decorators/public.decorator';
import { ArticleTrendServiceKey, IArticleTrendService } from '../interfaces/article-view-trend.interface';
import ResponseGetArticleViewTrendDto from '../dto/response/get-article-view-trend.dto';

@Controller({ path: 'articles/trends', version: '1' })
export default class ArticleTrendController {
  constructor(@Inject(ArticleTrendServiceKey) private readonly articleTrendService: IArticleTrendService) {}

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
