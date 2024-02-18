import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import RequestCreateCategory from '../types/dto/request/create-category.dto';
import ResponseFindCategoriesDto from '../types/dto/response/find-categories.dto';

export function createCategory(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiBody({ type: RequestCreateCategory }));
}

export function findCategories(summary: string) {
  return applyDecorators(
    ApiOperation({ summary, description: '카테고리 조회의 경우 정책상 최대 2 depth 까지만 조회한다' }),
    ApiOkResponse({ type: ResponseFindCategoriesDto }),
  );
}
