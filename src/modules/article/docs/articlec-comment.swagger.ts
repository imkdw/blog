import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiNoContentResponse, ApiOperation } from '@nestjs/swagger';
import { ReqeustUpdateCommentDto } from '../dto/request/article-comment.dto';

export const updateComment = (summary: string) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: ReqeustUpdateCommentDto }),
    ApiNoContentResponse({ description: '수정 성공' }),
  );

export const deleteComment = (summary: string) =>
  applyDecorators(ApiOperation({ summary }), ApiNoContentResponse({ description: '삭제 성공' }));
