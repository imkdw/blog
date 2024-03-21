import { HttpException, HttpStatus } from '@nestjs/common';

export const CONFICT_EXCEPTION_CODES = {
  EXIST_EMAIL: '409001',
  EXIST_NICKNAME: '409002',
  EXIST_CATEGORY_NAME: '409003',
  EXIST_CATEGORY_PARAM: '409004',
  EXIST_ARTICLE_ID: '409005',
} as const;

class ConfilctException extends HttpException {
  constructor(errorCode: string, data?: string) {
    super({ errorCode, data }, HttpStatus.CONFLICT);
  }
}

export class ExistEmailException extends ConfilctException {
  constructor(email?: string) {
    super(CONFICT_EXCEPTION_CODES.EXIST_EMAIL, email);
  }
}

export class ExistNicknameException extends ConfilctException {
  constructor(nickname?: string) {
    super(CONFICT_EXCEPTION_CODES.EXIST_NICKNAME, nickname);
  }
}

export class ExistCategoryNameException extends ConfilctException {
  constructor(name?: string) {
    super(CONFICT_EXCEPTION_CODES.EXIST_CATEGORY_NAME, name);
  }
}

export class ExistCategoryParamException extends ConfilctException {
  constructor(param?: string) {
    super(CONFICT_EXCEPTION_CODES.EXIST_CATEGORY_PARAM, param);
  }
}

export class ExistArticleIdException extends ConfilctException {
  constructor(id?: string) {
    super(CONFICT_EXCEPTION_CODES.EXIST_ARTICLE_ID, id);
  }
}
