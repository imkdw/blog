import { ApiProperty, PickType } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsNumber, IsString, Length, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import Article from '../../../domain/article.entity';
import IsArticleTitle from '../../../decorators/is-article-title.decorator';
import IsArticleSummary from '../../../decorators/is-article-summary.decorator';
import IsArticleContent from '../../../decorators/is-article-content.decorator';

export class RequestCreateArticleTagsDto {
  @ApiProperty({ description: '태그 이름', example: 'Node.js', minimum: 2, maximum: 20 })
  @IsString()
  @Length(2, 20)
  tagName: string;

  @ApiProperty({ description: '태그 순서', example: 1 })
  @IsNumber()
  sort: number;
}

export default class RequestCreateArticleDto extends PickType(Article, ['id', 'title', 'summary', 'content']) {
  @ApiProperty({ description: '게시글의 아이디, 실제 URL 주소로 활용됨', example: 'how-to-create-backend-api' })
  @IsString()
  id: string;

  @ApiProperty({ description: '게시글의 제목', example: '백엔드 API 만드는 방법' })
  @IsArticleTitle()
  title: string;

  @ApiProperty({ description: '게시글의 요약', example: '백엔드 API를 만드는 방법에 대해 알아봅시다.' })
  @IsArticleSummary()
  summary: string;

  @ApiProperty({ description: '게시글의 내용', example: '백엔드 API를 만드는 방법에 대해 알아봅시다.' })
  @IsArticleContent()
  content: string;

  @ApiProperty({ description: '부모 카테고리 ID', example: 1 })
  @IsNumber()
  parentCategoryId: number;

  @ApiProperty({ description: '자식 카테고리 ID', example: 2 })
  @IsNumber()
  childCategoryId: number;

  @ApiProperty({
    description: '게시글의 태그들',
    type: [RequestCreateArticleTagsDto],
    example: [
      {
        tagName: 'Node.js',
        sort: 1,
      },
      {
        tagName: 'Nest.js',
        sort: 2,
      },
    ],
  })
  @IsArray()
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => RequestCreateArticleTagsDto)
  tags: RequestCreateArticleTagsDto[];
}
