import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import Category from '../../../domain/category.entity';
import IsParentId from '../../../decorators/is-parent-id.decorator';

export default class RequestCreateCategory extends PickType(Category, ['parentId', 'name', 'param']) {
  @ApiProperty({ description: '부모 카테고리 아이디, 없을경우 null을 전송', example: 1, nullable: true, type: Number })
  @IsParentId()
  readonly parentId: number | null;

  @ApiProperty({ description: '카테고리 이름', example: '백엔드' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '카테고리 파라미터', example: 'backend' })
  @IsString()
  readonly param: string;
}
