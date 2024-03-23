import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class RequestCreateArticleDto {
  @ApiProperty({ description: '부모 카테고리 아이디', example: 1 })
  @IsNumber()
  readonly parentCategoryId: number;

  @ApiProperty({ description: '자식 카테고리 아이디', example: 1 })
  @IsNumber()
  readonly childCategoryId: number;

  @ApiProperty({ description: '게시글 아이디', example: 'how-to-use-nestjs' })
  @IsString()
  readonly articleId: string;

  @ApiProperty({ description: '게시글 제목', example: 'NestJS 사용법' })
  @IsString()
  readonly summary: string;

  @ApiProperty({ description: '게시글 내용', example: 'NestJS 사용법은 이렇습니다.' })
  @IsString()
  readonly title: string;

  @ApiProperty({ description: '게시글 내용', example: 'NestJS 사용법은 이렇습니다.' })
  @IsString()
  readonly content: string;

  @ApiProperty({ description: '게시글 썸네일', example: 'https://www.naver.com', required: false })
  @IsOptional()
  @IsString()
  readonly thumbnail: string;

  @ApiProperty({ description: '게시글 태그', example: ['NestJS', 'TypeORM'] })
  @IsArray()
  @IsString({ each: true })
  readonly tags: string[];
}

export class RequestGetArticlesByCategoryQuery {
  @ApiProperty({ description: '부모 카테고리 파라미터', example: 'backend', required: false, default: null })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  readonly parent: string;

  @ApiProperty({ description: '자식 카테고리 파라미터', example: 'nestjs', required: false, default: null })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  readonly child: string;
}
