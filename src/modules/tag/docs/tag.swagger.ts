import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import RequestCreateTagDto from '../types/dto/request/create-tag.dto';

export function createTag(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiBody({ type: RequestCreateTagDto }));
}

export function findTag(summary: string) {
  return applyDecorators(ApiOperation({ summary }));
}
