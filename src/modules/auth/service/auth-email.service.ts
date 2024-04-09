import { Inject, Injectable } from '@nestjs/common';
import { AuthEmailRepositoryKey, IAuthEmailRepository, IAuthEmailService } from '../interfaces/auth-email.interface';
import { EmailServiceKey, EmailSubject, IEmailService } from '../../../infra/email/interfaces/email.interface';
import EmailVerificationSender from '../domain/email-verification/email-sender';
import EmailValidation from '../domain/email-verification/email-validation';

@Injectable()
export default class AuthEmailService implements IAuthEmailService {
  constructor(
    @Inject(AuthEmailRepositoryKey) private readonly emailVerificationRepository: IAuthEmailRepository,
    @Inject(EmailServiceKey) private readonly emailService: IEmailService,
  ) {}

  async sendVerifyCode(email: string): Promise<number> {
    const emailVerificationSender = new EmailVerificationSender(email);
    emailVerificationSender.setCode().setExpiredDate();
    const createdEmailVerification = await this.emailVerificationRepository.save(emailVerificationSender);

    await this.emailService.send(email, EmailSubject.SINGUP_VEFIRY, createdEmailVerification.code);

    return createdEmailVerification.id;
  }

  async verifyCodeValidation(verificationId: number, code: string): Promise<boolean> {
    const emailVerification = await this.emailVerificationRepository.findOne(
      { id: verificationId },
      { includeDeleted: false },
    );
    if (!emailVerification) return false;

    const emailValidation = new EmailValidation({
      code: emailVerification.code,
      expiredAt: emailVerification.expiredAt,
    });
    if (emailValidation.isExpired() || !emailValidation.isCodeMatch(code)) return false;

    await this.emailVerificationRepository.update(verificationId, { verifiedAt: new Date() });

    return true;
  }
}
