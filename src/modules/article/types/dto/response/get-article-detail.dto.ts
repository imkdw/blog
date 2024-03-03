import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, IsUrl } from 'class-validator';

export default class ResponseGetArticleDetailDto {
  @ApiProperty({ description: '게시글 아이디' })
  @IsString()
  id: string;

  @ApiProperty({ description: '게시글 제목' })
  @IsString()
  title: string;

  @ApiProperty({ description: '게시글 요약' })
  @IsString()
  summary: string;

  @ApiProperty({ description: '게시글 내용' })
  @IsString()
  content: string;

  @ApiProperty({ description: '게시글 썸네일' })
  @IsUrl()
  thumbnail: string;

  @ApiProperty({ description: '게시글 생성일' })
  @IsDate()
  createAt: Date;

  @ApiProperty({ description: '게시글 댓글수' })
  @IsNumber()
  commentCount: number;
}
