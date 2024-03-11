export const EmailServiceKey = Symbol('EmailService');
export interface IEmailService {
  send(email: string, subject: IEmailSubject, html: string): Promise<void>;
}

export const EmailSubject = {
  SINGUP_VEFIRY: '[IMKDW_DEV] 이메일 인증코드',
};
export type IEmailSubject = (typeof EmailSubject)[keyof typeof EmailSubject];
