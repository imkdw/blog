import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ResponseGetPresignedUrlDto } from '../dto/response/s3.dto';

// eslint-disable-next-line import/prefer-default-export
export const getPresignedUrl = (summary: string) =>
  applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: ResponseGetPresignedUrlDto }));
