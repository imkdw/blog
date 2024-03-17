import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ResponseCreateCategoryDto, ResponseGetCategoriesDto } from '../dto/response/category.dto';
import { RequestCreateCategoryDto } from '../dto/request/category.dto';

export const getCategories = (summary: string) =>
  applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: ResponseGetCategoriesDto }));

export const createCategory = (summary: string) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: RequestCreateCategoryDto }),
    ApiCreatedResponse({ type: ResponseCreateCategoryDto }),
  );

export const deleteCategory = (summary: string) =>
  applyDecorators(ApiOperation({ summary }), ApiNoContentResponse({ description: '카테고리 삭제 성공' }));

export const updateCategory = (summary: string) =>
  applyDecorators(ApiOperation({ summary }), ApiNoContentResponse({ description: '카테고리 수정 성공' }));
