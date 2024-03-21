import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

// eslint-disable-next-line import/prefer-default-export
export class RequestCreateArticleDto {
  @ApiProperty({ description: '부모 카테고리 아이디', example: 1 })
  @IsNumber()
  parentCategoryId: number;

  @ApiProperty({ description: '자식 카테고리 아이디', example: 1 })
  @IsNumber()
  childCategoryId: number;

  @ApiProperty({ description: '게시글 아이디', example: 'how-to-use-nestjs' })
  @IsString()
  articleId: string;

  @ApiProperty({ description: '게시글 제목', example: 'NestJS 사용법' })
  @IsString()
  summary: string;

  @ApiProperty({ description: '게시글 내용', example: 'NestJS 사용법은 이렇습니다.' })
  @IsString()
  title: string;

  @ApiProperty({ description: '게시글 내용', example: 'NestJS 사용법은 이렇습니다.' })
  @IsString()
  content: string;

  @ApiProperty({ description: '게시글 썸네일', example: 'https://www.naver.com', required: false })
  @IsOptional()
  @IsString()
  thumbnail: string;

  @ApiProperty({ description: '게시글 태그', example: ['NestJS', 'TypeORM'] })
  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
