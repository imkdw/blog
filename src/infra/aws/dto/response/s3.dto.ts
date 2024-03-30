import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

// eslint-disable-next-line import/prefer-default-export
export class ResponseGetPresignedUrlDto {
  @ApiProperty({ description: 'S3 Presigned URL 주소' })
  @IsString()
  readonly presignedUrl: string;
}
