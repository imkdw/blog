import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { GetArticlesType, IGetArticlesType } from '../../enums/article.enum';

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
  @ApiProperty({
    description: `
    게시글 조회 타입

    ■ ${GetArticlesType.category} - 카테고리별 게시글 조회
      → parent, child 파라미터 필수

    ■ ${GetArticlesType.popular} - 인기 게시글 조회

    ■ ${GetArticlesType.recent} - 최신 게시글 조회

    ■ ${GetArticlesType.recommended} - 추천 게시글 조회
      → articleId 파라미터 필수
  `,
    example: GetArticlesType.category,
    enum: GetArticlesType,
  })
  @IsEnum(GetArticlesType)
  readonly type: IGetArticlesType;

  @ApiProperty({ description: '부모 카테고리 파라미터', example: 'backend', required: false, default: null })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  readonly parent: string | null;

  @ApiProperty({ description: '자식 카테고리 파라미터', example: 'nestjs', required: false, default: null })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  readonly child: string | null;

  @ApiProperty({ description: '게시글 아이디', required: false, default: null })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? null)
  readonly articleId: string | null;

  @ApiProperty({ description: '조회할 게시글의 개수', example: 10, required: false, default: null })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    const transformedValue = parseInt(value, 10);
    return Number.isNaN(transformedValue) ? null : transformedValue;
  })
  readonly limit: number | null;
}
