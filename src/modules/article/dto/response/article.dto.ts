import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

// eslint-disable-next-line import/prefer-default-export
export class ResponseCreateArticleDto {
  @ApiProperty({ description: '게시글 아이디', example: 'how-to-create-nestjs' })
  @IsString()
  articleId: string;
}
