import { PickType } from '@nestjs/swagger';
import EmailVerification from '../entities/email-verification.entity';
import { SYSTEM_USER_ID } from '../../../../common/constants/system.constant';

export default class EmailVerificationSender extends PickType(EmailVerification, [
  'code',
  'email',
  'expiredAt',
  'createUser',
  'updateUser',
]) {
  constructor(email: string) {
    super();
    this.email = email;
    this.createUser = SYSTEM_USER_ID;
    this.updateUser = SYSTEM_USER_ID;
  }

  setCode(): EmailVerificationSender {
    // 6자리의 인증 코드 생성
    const randomNumber = Math.floor(Math.random() * 900000);
    const authPin = `${randomNumber}`.padStart(6, '0');
    this.code = authPin;

    return this;
  }

  setExpiredDate(): EmailVerificationSender {
    // 이메일 인증 만료시간은 발송시간 기준 1시간까지유효함
    const expiredAt = new Date();
    expiredAt.setHours(expiredAt.getHours() + 1);
    this.expiredAt = expiredAt;

    return this;
  }
}
