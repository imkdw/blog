import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import RequestCreateCategory from '../types/dto/request/create-category.dto';

export function createCategory(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiBody({ type: RequestCreateCategory }));
}

export function findCategories(summary: string) {
  return applyDecorators(ApiOperation({ summary }));
}
