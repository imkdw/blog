import { PickType } from '@nestjs/swagger';
import EmailVerification from './email-verification.domain';

export default class EmailValidation extends PickType(EmailVerification, ['code', 'expiredAt']) {
  constructor(data: Omit<EmailValidation, 'isExpired' | 'isCodeMatch'>) {
    super();
    this.code = data.code;
    this.expiredAt = data.expiredAt;
  }

  isExpired(): boolean {
    return this.expiredAt < new Date();
  }

  isCodeMatch(code: string): boolean {
    return this.code === code;
  }
}
