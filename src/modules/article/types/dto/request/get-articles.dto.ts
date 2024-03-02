import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class RequestGetArticlesQuery {
  @ApiProperty({ description: '카테고리 param', example: 'backend' })
  @IsString()
  categoryParam: string;
}
