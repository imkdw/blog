import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ArticleMapperKey, ArticleServiceKey, IArticleMapper, IArticleService } from '../interfaces/article.interface';
import * as Swagger from '../docs/article.swagger';
import Admin from '../../auth/decorators/admin.decorator';
import { RequestCreateArticleDto } from '../dto/request/article.dto';
import Requester from '../../../common/decorators/requester.decorator';
import { IRequester } from '../../../common/interfaces/common.interface';
import { ResponseCreateArticleDto } from '../dto/response/article.dto';

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
}
