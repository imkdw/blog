import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class RequestCreateArticleCommentDto {
  @ApiProperty({ description: '댓글 내용', example: '댓글입니다' })
  @IsString()
  content: string;
}
