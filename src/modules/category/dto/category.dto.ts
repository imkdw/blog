import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import BaseEntity from '../../../common/domain/base.entity';
import Category from '../entities/category.entity';

export default class CategoryDto extends BaseEntity implements Category {
  @ApiProperty({ description: '카테고리의 고유 아이디', example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ description: '카테고리의 부모 아이디', nullable: true, example: 2 })
  @IsOptional()
  parentId: number | null;

  @ApiProperty({ description: '카테고리 이름', example: 'Backend' })
  @IsString()
  name: string;

  @ApiProperty({ description: '카테고리 파라미터', example: 'nestjs' })
  @IsString()
  param: string;

  @ApiProperty({ description: '카테고리 정렬 순서', example: 2 })
  @IsNumber()
  sort: number;
}
