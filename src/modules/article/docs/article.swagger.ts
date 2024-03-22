import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { RequestCreateArticleDto } from '../dto/request/article.dto';
import { ResponseCreateArticleDto, ResponseGetArticleDetailDto } from '../dto/response/article.dto';

export const createArticle = (summary: string) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: RequestCreateArticleDto }),
    ApiCreatedResponse({ type: ResponseCreateArticleDto }),
  );

export const getArticleDetail = (summary: string) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiParam({ name: 'articleId', description: '게시글 아이디', example: 'how-to-create-nestjs' }),
    ApiOkResponse({ type: ResponseGetArticleDetailDto }),
  );

export const getArticleTags = (summary: string) => applyDecorators(ApiOperation({ summary }));
