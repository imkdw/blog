import { ApiProperty, PickType } from '@nestjs/swagger';
import Tag from '../../../domain/tag.entity';

class SearchTagDto extends PickType(Tag, ['id', 'name']) {
  @ApiProperty({ description: '태그의 아이디' })
  id: number;

  @ApiProperty({ description: '태그의 이름' })
  name: string;
}

export default class ResponseSearchTagsDto {
  @ApiProperty({ description: '태그 목록', type: [SearchTagDto] })
  tags: SearchTagDto[];
}
