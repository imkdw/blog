import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, IsUrl } from 'class-validator';

/**
 * 댓글 작성 DTO
 */
export class ResponseCreateCommentDto {
  @ApiProperty({ description: '댓글 아이디' })
  @IsNumber()
  id: number;
}

/**
 * 게시글의 댓글 리스트 조회 DTO
 */
export class GetCommentsUser {
  @ApiProperty({ description: '유저 닉네임' })
  @IsString()
  nickname: string;

  @ApiProperty({ description: '유저 프로필 이미지' })
  @IsUrl()
  profile: string;

  @ApiProperty({ description: '댓글 작성자 여부', example: true })
  @IsString()
  isAuthor: boolean;
}
export class GetCommentsContent {
  @ApiProperty({ description: '댓글 아이디' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: '댓글 내용' })
  @IsString()
  content: string;

  @ApiProperty({ description: '댓글 작성자 정보', type: GetCommentsUser })
  @IsString()
  user: GetCommentsUser;

  @ApiProperty({ description: '댓글 작성일' })
  @IsDate()
  createdAt: Date;
}
export class ResponseGetCommentsDto {
  @ApiProperty({ description: '댓글 리스트', type: [GetCommentsContent] })
  comments: GetCommentsContent[];
}
