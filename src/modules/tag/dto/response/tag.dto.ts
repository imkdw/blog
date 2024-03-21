import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

class SearchTagDto {
  @ApiProperty({ description: '태그 아이디' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: '태그 이름' })
  @IsString()
  name: string;
}

// eslint-disable-next-line import/prefer-default-export
export class ResponseSearchTagDto {
  @ApiProperty({ description: '특정 단어로 검색된 태그 목록', type: [SearchTagDto] })
  tags: SearchTagDto[];
}
