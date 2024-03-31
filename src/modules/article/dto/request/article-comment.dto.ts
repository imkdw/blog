import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import IsArticleComment from '../../decorators/is-comment.decorator';

export class RequestCreateCommentParams {
  @ApiProperty({ description: '게시글 ID', example: 'how-to-use-nestjs' })
  @IsString()
  readonly articleId: string;
}

export class RequestCreateCommentDto {
  @ApiProperty({ description: '댓글 내용', minimum: 1, maximum: 1000, example: 'NestJS 사용법은 이렇습니다.' })
  @IsArticleComment()
  readonly content: string;
}

export class ReqeustUpdateCommentParam {
  @ApiProperty({ description: '게시글 ID', example: 'how-to-use-nestjs' })
  @IsString()
  readonly articleId: string;

  @ApiProperty({ description: '댓글 ID', example: 1 })
  @IsNumber()
  @Type(() => Number)
  readonly commentId: number;
}

export class ReqeustUpdateCommentDto {
  @ApiProperty({ description: '댓글 내용', minimum: 1, maximum: 1000, example: 'NestJS 사용법은 이렇습니다.' })
  @IsArticleComment()
  readonly content: string;
}
