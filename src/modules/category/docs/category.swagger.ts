import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ResponseGetCategoriesDto } from '../dto/response/category.dto';

// eslint-disable-next-line import/prefer-default-export
export const getCategories = (summary: string) =>
  applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: ResponseGetCategoriesDto }));
