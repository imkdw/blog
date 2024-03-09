import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { RequestCommonSingupDto } from '../dto/request/auth-common.dto';
import { ResponseAuthResultDto } from '../dto/response/auth.dto';
import { CONFICT_EXCEPTION_CODES } from '../../../common/exceptions/409';

// eslint-disable-next-line import/prefer-default-export
export const signup = (summary: string) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: RequestCommonSingupDto }),
    ApiCreatedResponse({ type: ResponseAuthResultDto }),
    ApiConflictResponse({
      description: `
    ${CONFICT_EXCEPTION_CODES.EXIST_EMAIL} : 이메일이 중복되어 회원가입에 실패했을 때 반환되는 에러코드
    ${CONFICT_EXCEPTION_CODES.EXIST_NICKNAME} : 닉네임이 중복되어 회원가입에 실패했을 때 반환되는 에러코드
    `,
    }),
  );
