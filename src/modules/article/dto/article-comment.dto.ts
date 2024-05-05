import { IsNumber, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import BaseEntity from '../../../common/domain/base.entity';

export default class ArticleCommentDto extends BaseEntity {
  @ApiProperty({ description: '댓글의 고유 아이디', example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ description: '댓글이 작성된 게시글 아이디', example: 'how-to-use-nestjs' })
  @IsString()
  articleId: string;

  @ApiProperty({ description: '댓글 작성자의 아이디', example: 'UUID' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: '댓글 내용', example: '댓글 내용입니다.', maxLength: 65000 })
  @IsString()
  @MaxLength(65000)
  content: string;
}
