import { ApiProperty } from '@nestjs/swagger';
import { article } from '@prisma/client';

import BaseEntity from '../../../common/domain/base.entity';

export default class Article extends BaseEntity implements article {
  @ApiProperty({ description: '게시글 고유 ID, 글 작성시 입력받는 값으로 구성된다' })
  readonly id: string;

  @ApiProperty({ description: '게시글 제목' })
  readonly title: string;

  @ApiProperty({ description: '게시글 작성자 ID' })
  readonly userId: number;

  @ApiProperty({ description: '게시글 요약' })
  readonly summary: string;

  @ApiProperty({ description: '게시글 내용' })
  readonly content: string;

  @ApiProperty({ description: '게시글 썸네일 이미지 URL' })
  readonly thumbnail: string;

  @ApiProperty({ description: '게시글 조회수' })
  readonly viewCount: number = 0;

  @ApiProperty({ description: '게시글 좋아요 수' })
  readonly likeCount: number = 0;

  @ApiProperty({ description: '게시글 댓글 수' })
  readonly commentCount: number = 0;
}
