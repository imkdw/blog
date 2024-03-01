import { articleComment } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

import BaseEntity from '../../../common/domain/base.entity';

export default class ArticleComment extends BaseEntity implements articleComment {
  @ApiProperty({ description: '게시글 댓글 고유 ID' })
  readonly id: number;

  @ApiProperty({ description: '게시글 ID' })
  readonly articleId: string;

  @ApiProperty({ description: '댓글 작성자 ID' })
  readonly userId: string;

  @ApiProperty({ description: '댓글 내용' })
  readonly content: string;
}
