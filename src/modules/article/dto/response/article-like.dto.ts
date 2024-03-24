import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

// eslint-disable-next-line import/prefer-default-export
export class ResponseToggleArticleLikeDto {
  @ApiProperty({ description: '토클 이후 좋아요 여부', example: true })
  @IsBoolean()
  isLiked: boolean;

  @ApiProperty({ description: '토클 이후 게시글 좋아요 수', example: 123 })
  @IsNumber()
  likeCount: number;
}
