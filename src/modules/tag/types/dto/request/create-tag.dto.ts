import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import Tag from '../../../domain/tag.entity';

export default class RequestCreateTagDto extends PickType(Tag, ['name']) {
  @ApiProperty({ description: '태그 이름', example: '태그 이름' })
  @IsString()
  readonly name: string;
}
