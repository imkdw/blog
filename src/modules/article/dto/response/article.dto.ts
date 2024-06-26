import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsString, IsUrl, ValidateNested } from 'class-validator';

/**
 * 게시글 생성 응답 DTO
 */
export class ResponseCreateArticleDto {
  @ApiProperty({ description: '게시글 아이디', example: 'how-to-create-nestjs' })
  @IsString()
  articleId: string;
}

/**
 * 게시글 상세정보 조회 응답 DTO
 */
export class GetArticleDetailLike {
  @ApiProperty({ description: '좋아요 유무', example: true })
  @IsBoolean()
  isLiked: boolean;

  @ApiProperty({ description: '좋아요 개수' })
  @IsNumber()
  likeCount: number;
}
export class ResponseGetArticleDetailDto {
  @ApiProperty({ description: '게시글 아이디', example: 'how-to-create-nestjs' })
  @IsString()
  articleId: string;

  @ApiProperty({ description: '게시글 썸네일', example: 'https://example.com/thumbnail.png' })
  @IsUrl()
  thumbnail: string;

  @ApiProperty({ description: '게시글 제목', example: 'NestJS로 게시글 작성하기' })
  @IsString()
  title: string;

  @ApiProperty({ description: '게시글 요약', example: 'NestJS로 게시글 작성하는 방법을 알아봅시다.' })
  @IsString()
  summary: string;

  @ApiProperty({ description: '게시글 내용', example: 'NestJS로 게시글을 작성하는 방법은 간단합니다. ...' })
  @IsString()
  content: string;

  @ApiProperty({ description: '게시글 작성일', example: new Date() })
  @IsString()
  createdAt: Date;

  @ApiProperty({ description: '게시글 조회수', example: 100 })
  @IsNumber()
  viewCount: number;

  @ApiProperty({ description: '게시글 댓글 수', example: 5 })
  @IsNumber()
  commentCount: number;

  @ApiProperty({ description: '게시글 좋아요', type: GetArticleDetailLike })
  @ValidateNested()
  @Type(() => GetArticleDetailLike)
  like: GetArticleDetailLike;
}

/**
 * 게시글 태그 조회 응답 DTO
 */
export class GetArticleTagsDto {
  @ApiProperty({ description: '태그 아이디', example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ description: '태그 이름', example: 'NestJS' })
  @IsString()
  name: string;
}

export class ResponseGetArticleTagsDto {
  @ApiProperty({ description: '게시글 태그 목록', type: [GetArticleTagsDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GetArticleTagsDto)
  tags: GetArticleTagsDto[];
}

/**
 * 게시글 목록 조회 응답 DTO
 */
export class GetArticlesDto {
  @ApiProperty({ description: '게시글 아이디', example: 'how-to-create-nestjs' })
  @IsString()
  articleId: string;

  @ApiProperty({ description: '게시글 썸네일', example: 'https://example.com/thumbnail.png' })
  @IsUrl()
  thumbnail: string;

  @ApiProperty({ description: '게시글 제목', example: 'NestJS로 게시글 작성하기' })
  @IsString()
  title: string;

  @ApiProperty({ description: '게시글 요약', example: 'NestJS로 게시글 작성하는 방법을 알아봅시다.' })
  @IsString()
  summary: string;

  @ApiProperty({ description: '게시글 조회수', example: 100 })
  @IsNumber()
  viewCount: number;

  @ApiProperty({ description: '게시글 댓글 수', example: 5 })
  @IsNumber()
  commentCount: number;

  @ApiProperty({ description: '게시글 좋아요 수', example: 10 })
  @IsNumber()
  likeCount: number;

  @ApiProperty({ description: '게시글 작성일', example: new Date() })
  @IsString()
  createdAt: Date;
}
export class ResponseGetArticlesDto {
  @ApiProperty({ description: '게시글 목록', type: [GetArticlesDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GetArticlesDto)
  articles: GetArticlesDto[];
}

/**
 * 게시글 조회수 증가 응답 DTO
 */
export class ResponseIncreaseViewCountDto {
  @ApiProperty({ description: '최신 게시글 조회수', example: 123 })
  @IsNumber()
  viewCount: number;
}

/**
 * [SEO] 게시글 아이디 목록 조회
 */
export class ResponseGetArticleIdsDto {
  @ApiProperty({ description: '게시글 아이디 목록', example: ['how-to-create-nestjs', 'how-to-use-nestjs'] })
  @IsArray()
  @IsString({ each: true })
  articleIds: string[];
}
