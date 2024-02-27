import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export default class ResponseCheckArticleIdDto {
  @ApiProperty({ description: '게시글 아이디 중복여부' })
  @IsBoolean()
  isExist: boolean;
}
