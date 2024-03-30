import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

// eslint-disable-next-line import/prefer-default-export
export class RequestGetPresignedUrlQuery {
  @ApiProperty({ description: '파일 이름', example: 'test' })
  @IsString()
  fileName: string;

  @ApiProperty({ description: '파일 확장자', example: 'jpg' })
  @IsString()
  extension: string;
}
