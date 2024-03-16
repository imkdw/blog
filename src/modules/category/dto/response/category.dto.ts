import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

class BaseCategoryDto {
  @ApiProperty({ description: '카테고리 아이디' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: '카테고리 이름' })
  @IsString()
  name: string;

  @ApiProperty({ description: '카테고리 파라미터' })
  @IsString()
  param: string;
}
export class GetCategoriesDto extends BaseCategoryDto {
  @ApiProperty({ description: '자식 카테고리 리스트', type: [BaseCategoryDto] })
  children: BaseCategoryDto[];
}
// eslint-disable-next-line import/prefer-default-export
export class ResponseGetCategoriesDto {
  @ApiProperty({ description: '카테고리 리스트', type: [GetCategoriesDto] })
  categories: GetCategoriesDto[];
}
