import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsUrl } from 'class-validator';

export class GetArticlesDto {
  @ApiProperty({ description: '게시글 아이디', example: 'how-to-create-api-with-nestjs' })
  @IsString()
  id: string;

  @ApiProperty({ description: '게시글 제목', example: 'NestJS로 API 만드는 방법' })
  @IsString()
  title: string;

  @ApiProperty({ description: '게시글 내용', example: '잘 만드시면 됩니다.' })
  @IsString()
  content: string;

  @ApiProperty({ description: '썸네일 이미지', example: 'https://via.placeholder.com/150' })
  @IsUrl()
  thumbnail: string;

  @ApiProperty({ description: '작성일', example: '2021-07-01T00:00:00.000Z' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ description: '좋아요 수', example: 0 })
  likeCount: number;

  @ApiProperty({ description: '댓글 수', example: 0 })
  commentCount: number;
}

export default class ResponseGetArticlesDto {
  @ApiProperty({ type: [GetArticlesDto] })
  articles: GetArticlesDto[];
}
