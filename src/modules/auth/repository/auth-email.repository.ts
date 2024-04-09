import { Injectable } from '@nestjs/common';
import { IAuthEmailRepository } from '../interfaces/auth-email.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import EmailVerificationSender from '../domain/email-verification/email-sender';
import EmailVerification from '../domain/email-verification/email-verification.domain';
import { FindOption } from '../../../common/interfaces/find-option.interface';

@Injectable()
export default class AuthEmailRepository implements IAuthEmailRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(sender: EmailVerificationSender): Promise<EmailVerification> {
    const row = await this.prisma.emailVerification.create({ data: sender });
    return new EmailVerification(row);
  }

  async update(verificationId: number, data: Partial<EmailVerification>): Promise<void> {
    await this.prisma.emailVerification.update({ where: { id: verificationId }, data });
  }

  async findOne(dto: Partial<EmailVerification>, option: FindOption): Promise<EmailVerification | null> {
    const row = await this.prisma.emailVerification.findFirst({
      where: { ...dto, ...(option.includeDeleted ? {} : { deleteAt: null }) },
    });
    return row ? new EmailVerification(row) : null;
  }
}
