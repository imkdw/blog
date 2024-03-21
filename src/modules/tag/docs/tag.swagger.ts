import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { ResponseSearchTagDto } from '../dto/response/tag.dto';

export const createTag = (summary: string) => applyDecorators(ApiOperation({ summary }));

export const searchTag = (summary: string) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiParam({ name: 'tagName', example: 'nestjs', description: '검색할 태그 이름' }),
    ApiOkResponse({ type: ResponseSearchTagDto }),
  );
