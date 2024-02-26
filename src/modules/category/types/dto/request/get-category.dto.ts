import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';

import IsParentId from '../../../decorators/is-parent-id.decorator';

export const getCategoryFilter = {
  parent: 'parent',
  children: 'children',
} as const;
export type IGetCategoryFilter = (typeof getCategoryFilter)[keyof typeof getCategoryFilter];

export default class RequestGetCategoryQuery {
  @ApiProperty({ description: '카테고리의 종류', enum: getCategoryFilter })
  @IsEnum(getCategoryFilter)
  readonly filter: IGetCategoryFilter;

  @ApiProperty({ description: '부모 카테고리의 아이디, 부모 카테고리를 조회할때는 null로 보내야한다' })
  @IsParentId()
  @Transform(({ value }) => (value === 'null' ? null : parseInt(value, 10)), { toClassOnly: true })
  readonly parentId: number | null;
}
