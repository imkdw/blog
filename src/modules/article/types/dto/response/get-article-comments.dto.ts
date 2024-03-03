import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsString, IsUrl } from 'class-validator';

export class GetArticleCommentUserDto {
  @ApiProperty({ description: '유저의 프로필 사진', example: 'https://avatars.githubusercontent.com/u/12345678?v=4' })
  @IsUrl()
  readonly profile: string;

  @ApiProperty({ description: '유저의 닉네임', example: 'IMKDW' })
  @IsString()
  readonly nickname: string;

  @ApiProperty({ description: '로그인한 유저의 댓글 주인 여부', example: false })
  @IsBoolean()
  readonly isWriter: boolean;
}

export class GetArticleCommentsDto {
  @ApiProperty({ description: '댓글의 아이디', example: '1' })
  @IsString()
  readonly id: number;

  @ApiProperty({ description: '댓글의 내용', example: '댓글 내용' })
  @IsString()
  readonly content: string;

  @ApiProperty({ description: '댓글을 작성한 유저', type: GetArticleCommentUserDto })
  readonly user: GetArticleCommentUserDto;

  @ApiProperty({ description: '댓글을 작성한 날짜', example: '2021-08-15T12:00:00' })
  @IsDate()
  readonly createAt: Date;
}

export default class ResponseGetArticleCommentsDto {
  @ApiProperty({ description: '게시글의 댓글 목록', type: [GetArticleCommentsDto] })
  readonly comments: GetArticleCommentsDto[];
}
