import EmailVerification from '../domain/entities/email-verification.entity';
import EmailVerificationSender from '../domain/models/email-verification-sender.model';

export const AuthEmailServiceKey = Symbol('AuthService');
export interface IAuthEmailService {
  sendVerifyCode(email: string): Promise<number>;

  verifyCodeValidation(verificationId: number, code: string): Promise<boolean>;
}

export const AuthEmailRepositoryKey = Symbol('AuthEmailRepository');
export interface IAuthEmailRepository {
  save(emailVerificationSender: EmailVerificationSender): Promise<EmailVerification>;

  update(verificationId: number, data: Partial<EmailVerification>): Promise<void>;

  findById(verificationId: number): Promise<EmailVerification | null>;
}
