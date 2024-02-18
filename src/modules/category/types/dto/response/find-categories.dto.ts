import { IsNumber, IsString } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

import Category from '../../../domain/category.entity';

export class FindCategoryDto extends PickType(Category, ['id', 'name', 'sort']) {
  @ApiProperty({ description: '카테고리의 고유 ID', example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ description: '카테고리명', example: '백엔드' })
  @IsString()
  name: string;

  @ApiProperty({ description: '카테고리 정렬 순서', example: 1 })
  @IsNumber()
  sort: number;
}

export class FindParentCategoryDto extends PickType(Category, ['id', 'name', 'sort']) {
  @ApiProperty({ description: '카테고리의 고유 ID', example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ description: '카테고리명', example: '백엔드' })
  @IsString()
  name: string;

  @ApiProperty({ description: '카테고리 정렬 순서', example: 1 })
  @IsNumber()
  sort: number;

  @ApiProperty({ description: '하위 카테고리 목록', type: [FindCategoryDto] })
  children: FindCategoryDto[];
}

export default class ResponseFindCategoriesDto {
  @ApiProperty({ description: '카테고리 목록', type: [FindParentCategoryDto] })
  categories: FindParentCategoryDto[];
}
