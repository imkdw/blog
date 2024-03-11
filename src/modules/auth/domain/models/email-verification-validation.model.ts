import { PickType } from '@nestjs/swagger';
import EmailVerification from '../entities/email-verification.entity';

export default class EmailVerificationValidation extends PickType(EmailVerification, ['code', 'expiredAt']) {
  constructor(code: string, expiredAt: Date) {
    super();
    this.code = code;
    this.expiredAt = expiredAt;
  }

  isExpired(): boolean {
    return this.expiredAt < new Date();
  }

  isCodeMatch(code: string): boolean {
    return this.code === code;
  }
}
