import { FindOption } from '../../../common/interfaces/find-option.interface';
import EmailVerificationSender from '../domain/email-verification/email-sender';
import EmailVerification from '../domain/email-verification/email-verification.domain';

export const AuthEmailServiceKey = Symbol('AuthService');
export interface IAuthEmailService {
  sendVerifyCode(email: string): Promise<number>;

  verifyCodeValidation(verificationId: number, code: string): Promise<boolean>;
}

export const AuthEmailRepositoryKey = Symbol('AuthEmailRepository');
export interface IAuthEmailRepository {
  save(sender: EmailVerificationSender): Promise<EmailVerification>;

  update(verificationId: number, data: Partial<EmailVerification>): Promise<void>;

  findOne(dto: Partial<EmailVerification>, option: FindOption): Promise<EmailVerification | null>;
}
