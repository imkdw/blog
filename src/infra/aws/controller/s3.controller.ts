import { Controller, Get, Inject, Query } from '@nestjs/common';
import { AwsS3ServiceKey, IAwsS3Service } from '../interfaces/s3.interface';
import { ResponseGetPresignedUrlDto } from '../dto/response/s3.dto';
import { Public } from '../../../modules/auth/decorators/public.decorator';
import * as Swagger from '../docs/s3.swagger';
import { RequestGetPresignedUrlQuery } from '../dto/request/s3.dto';

@Controller({ path: 'aws/s3', version: '1' })
export default class AwsS3Controller {
  constructor(@Inject(AwsS3ServiceKey) private readonly awsS3Service: IAwsS3Service) {}

  @Swagger.getPresignedUrl('S3 Presigned URL 주소 발급')
  @Public()
  @Get('presigned-url')
  async getPresignedUrl(@Query() query: RequestGetPresignedUrlQuery): Promise<ResponseGetPresignedUrlDto> {
    const presignedUrl = await this.awsS3Service.getPresignedUrl(query.fileName, query.extension);

    return { presignedUrl };
  }
}
