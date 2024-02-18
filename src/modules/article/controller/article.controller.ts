import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ArticleService, ArticleServiceSymbol } from '../types/service/article.service';
import RequestCreateArticleDto from '../types/dto/request/create-article.dto';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRoles } from '../../user/domain/user.entity';
import AdminGuard from '../../auth/guards/admin.guard';
import User, { IUser } from '../../../common/decorators/user.decorator';
import ResponseCreateArticleDto from '../types/dto/response/create-article.dto';
import * as Swagger from '../docs/article.swagger';

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
}
