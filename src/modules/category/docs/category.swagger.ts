import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
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

export const deleteCategory = (summary: string) => applyDecorators(ApiOperation({ summary }));
