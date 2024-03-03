import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetTagsDto {
  @ApiProperty({ description: '태그 아이디', example: 1 })
  id: number;

  @ApiProperty({ description: '태그 이름', example: '태그이름' })
  @IsString()
  name: string;
}

export default class ResponseGetTagsDto {
  @ApiProperty({ description: '태그 목록', type: [GetTagsDto] })
  tags: GetTagsDto[];
}
