import { ApiProperty } from '@nestjs/swagger';
import { category } from '@prisma/client';

import BaseEntity from '../../../common/domain/base.entity';

export default class Category extends BaseEntity implements category {
  @ApiProperty({ description: '카테고리 아이디', example: 1 })
  readonly id: number;

  @ApiProperty({ description: '부모 카테고리 아이디', example: 1 })
  readonly parentId: number;

  @ApiProperty({ description: '카테고리 이름', example: '카테고리 이름' })
  readonly name: string;
}
