import { ApiProperty } from '@nestjs/swagger';
import { category } from '@prisma/client';

import BaseEntity from '../../../common/domain/base.entity';

export default class Category extends BaseEntity implements category {
  constructor(categoryData: Partial<Category>) {
    super();
    Object.assign(this, categoryData);
  }

  @ApiProperty({ description: '카테고리 아이디', example: 1 })
  readonly id: number;

  @ApiProperty({ description: '부모 카테고리 아이디', example: 1 })
  readonly parentId: number | null = null;

  @ApiProperty({ description: '카테고리 이름', example: '카테고리 이름' })
  readonly name: string;

  @ApiProperty({ description: '카테고리 클릭시 이동되는 링크', example: '/category' })
  readonly param: string;

  @ApiProperty({ description: '카테고리 순서', example: '1' })
  readonly sort: number;
}
