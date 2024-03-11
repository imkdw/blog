import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export const sendVerifyCode = (summary: string) => applyDecorators(ApiOperation({ summary }));

export const verifyCodeValidation = (summary: string) => applyDecorators(ApiOperation({ summary }));
