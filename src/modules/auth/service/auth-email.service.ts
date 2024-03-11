import { Inject, Injectable } from '@nestjs/common';
import { AuthEmailRepositoryKey, IAuthEmailRepository, IAuthEmailService } from '../interfaces/auth-email.interface';
import EmailVerificationSender from '../domain/models/email-verification-sender.model';
import { EmailServiceKey, EmailSubject, IEmailService } from '../../../infra/email/interfaces/email.interface';
import EmailVerificationValidation from '../domain/models/email-verification-validation.model';

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
    const emailVerification = await this.emailVerificationRepository.findById(verificationId);
    if (!emailVerification) return false;

    const emailValidation = new EmailVerificationValidation(emailVerification.code, emailVerification.expiredAt);
    if (emailValidation.isExpired()) return false;
    if (!emailValidation.isCodeMatch(code)) return false;

    await this.emailVerificationRepository.update(verificationId, { verifiedAt: new Date() });

    return true;
  }
}
