import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function getArticleComments(summary: string) {
  return applyDecorators(ApiOperation({ summary }));
}

export function createArticleComment(summary: string) {
  return applyDecorators(ApiOperation({ summary }));
}
