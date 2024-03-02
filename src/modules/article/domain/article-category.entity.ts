import { articleCategory } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

import BaseEntity from '../../../common/domain/base.entity';

export default class ArticleCategory extends BaseEntity implements articleCategory {
  constructor(_articleCategory: Partial<ArticleCategory>) {
    super();
    Object.assign(this, _articleCategory);
  }

  @ApiProperty({ description: '아티클 카테고리 아이디', example: 1 })
  id: number;

  @ApiProperty({ description: '아티클 아이디', example: 'article_id' })
  articleId: string;

  @ApiProperty({ description: '카테고리 아이디', example: 1 })
  categoryId: number;
}
