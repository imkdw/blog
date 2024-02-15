import { articleTag } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

import BaseEntity from '../../../common/domain/base.entity';

export default class ArticleTag extends BaseEntity implements articleTag {
  @ApiProperty({ description: '아티클 태그 아이디', example: 1 })
  articleId: string;

  @ApiProperty({ description: '태그 아이디', example: 1 })
  tagId: number;
}
