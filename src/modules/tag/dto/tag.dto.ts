import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

import BaseEntity from '../../../common/domain/base.entity';
import Tag from '../entities/tag.entity';

export default class TagDto extends BaseEntity implements Tag {
  @ApiProperty({ description: '태그의 고유 ID', example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ description: '태그 이름', example: 'javascript' })
  @IsString()
  name: string;
}
