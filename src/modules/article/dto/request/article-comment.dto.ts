import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

// eslint-disable-next-line import/prefer-default-export
export class RequestCreateCommentDto {
  @ApiProperty({ description: '댓글 내용', minimum: 1, maximum: 1000, example: 'NestJS 사용법은 이렇습니다.' })
  @IsString()
  @Length(1, 1000)
  readonly content: string;
}
