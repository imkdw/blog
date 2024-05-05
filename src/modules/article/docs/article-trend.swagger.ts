import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import ResponseGetArticleViewTrendDto from '../dto/response/get-article-view-trend.dto';

// eslint-disable-next-line import/prefer-default-export
export const getArticleViewTrends = (summary: string) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiQuery({
      description: '조회할 데이터의 기간, 30의 경우 최근 30일동안 데이터를 조회함',
      example: 30,
      name: 'duration',
      type: Number,
    }),
    ApiOkResponse({ type: ResponseGetArticleViewTrendDto }),
  );
