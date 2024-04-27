import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ResponseRefreshTokenDto } from '../dto/response/auth.dto';

// eslint-disable-next-line import/prefer-default-export
export const refreshToken = (summary: string) =>
  applyDecorators(ApiOperation({ summary }), ApiCreatedResponse({ type: ResponseRefreshTokenDto }));
