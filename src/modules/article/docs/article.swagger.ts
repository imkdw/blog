import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { RequestCreateArticleDto } from '../dto/request/article.dto';
import {
  ResponseCreateArticleDto,
  ResponseGetArticleDetailDto,
  ResponseGetArticlesDto,
  ResponseGetArticleTagsDto,
} from '../dto/response/article.dto';
import { RequestCreateCommentDto } from '../dto/request/article-comment.dto';
import { ResponseCreateCommentDto, ResponseGetCommentsDto } from '../dto/response/article-comment.dto';
import { ResponseToggleArticleLikeDto } from '../dto/response/article-like.dto';

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

export const getArticleTags = (summary: string) =>
  applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: ResponseGetArticleTagsDto }));

export const createComment = (summary: string) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: RequestCreateCommentDto }),
    ApiCreatedResponse({ type: ResponseCreateCommentDto }),
  );

export const getComments = (summary: string) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiParam({ name: 'articleId', description: '댓글을 조회할 게시글의 아이디' }),
    ApiOkResponse({ type: ResponseGetCommentsDto }),
  );

export const getArticlesByCategory = (summary: string) =>
  applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: ResponseGetArticlesDto }));

export const toggleArticleLike = (summary: string) =>
  applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type: ResponseToggleArticleLikeDto }));
