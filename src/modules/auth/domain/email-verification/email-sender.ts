import { PickType } from '@nestjs/swagger';
import EmailVerification from './email-verification.domain';

export default class EmailVerificationSender extends PickType(EmailVerification, ['code', 'email', 'expiredAt']) {
  constructor(email: string) {
    super();
    this.email = email;
  }

  /**
   * 6자리의 인증코드 설정
   */
  setCode(): EmailVerificationSender {
    const randomNumber = Math.floor(Math.random() * 900000);
    const authPin = randomNumber.toString().padStart(6, '0');
    this.code = authPin;

    return this;
  }

  /**
   * 이메일 인증시간 설정
   *
   * 코드 발급시간 기준 1시간 후 만료
   */
  setExpiredDate(): EmailVerificationSender {
    const expiredAt = new Date();
    expiredAt.setHours(expiredAt.getHours() + 1);
    this.expiredAt = expiredAt;

    return this;
  }
}
