import { articleImage } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

import BaseEntity from '../../../common/domain/base.entity';

export default class ArticleImage extends BaseEntity implements articleImage {
  @ApiProperty({ description: '게시글 사진 고유 ID' })
  readonly id: number;

  @ApiProperty({ description: '사진과 연관된 게시글 ID' })
  readonly articleId: string;

  @ApiProperty({ description: '사진이 저장된 저장소의 URL' })
  readonly image: string;

  @ApiProperty({ description: '사진의 순서' })
  readonly sort: number;
}
