import { HttpException, HttpStatus } from '@nestjs/common';

export const CONFICT_EXCEPTION_CODES = {
  EXIST_EMAIL: '409001',
  EXIST_NICKNAME: '409002',
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
