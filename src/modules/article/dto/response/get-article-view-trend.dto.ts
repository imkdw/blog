import { ApiProperty } from '@nestjs/swagger';

export class GetArticleViewTrendItem {
  @ApiProperty({ description: '고유 ID' })
  id: number;

  @ApiProperty({ description: '기준 일자' })
  date: Date;

  @ApiProperty({ description: '조회수' })
  viewCount: number;
}

export default class ResponseGetArticleViewTrendDto {
  @ApiProperty({ description: '게시글 조회수 추이 목록', type: [GetArticleViewTrendItem] })
  viewTrends: GetArticleViewTrendItem[];
}
