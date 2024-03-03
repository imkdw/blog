import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import RequestCreateArticleDto from '../types/dto/request/create-article.dto';
import ResponseCreateArticleDto from '../types/dto/response/create-article.dto';

export function createArticle(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBearerAuth('accessToken'),
    ApiBody({ type: RequestCreateArticleDto }),
    ApiCreatedResponse({ type: ResponseCreateArticleDto }),
  );
}

export function getArticleDetail(summary: string) {
  return applyDecorators(ApiOperation({ summary }));
}

export function checkArticleId(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiBearerAuth('accessToken'));
}

export function getArticles(summary: string) {
  return applyDecorators(ApiOperation({ summary }));
}
