import { ApiProperty } from '@nestjs/swagger';
import { tag } from '@prisma/client';

import BaseEntity from '../../../common/domain/base.entity';

export default class Tag extends BaseEntity implements tag {
  @ApiProperty({ description: '태그 아이디', example: 1 })
  id: number;

  @ApiProperty({ description: '태그 이름', example: '태그 이름' })
  tag: string;
}
