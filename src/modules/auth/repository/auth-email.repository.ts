import { Inject, Injectable } from '@nestjs/common';
import { IAuthEmailRepository } from '../interfaces/auth-email.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import EmailVerification from '../domain/entities/email-verification.entity';
import EmailVerificationSender from '../domain/models/email-verification-sender.model';
import { AuthMapperKey, IAuthMapper } from '../interfaces/auth.interface';

@Injectable()
export default class AuthEmailRepository implements IAuthEmailRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(AuthMapperKey) private readonly authMapper: IAuthMapper,
  ) {}

  async save(emailVerificationSender: EmailVerificationSender): Promise<EmailVerification> {
    const emailVerification = await this.prisma.emailVerification.create({
      data: emailVerificationSender,
    });

    return this.authMapper.toEmailVerification(emailVerification);
  }

  async update(verificationId: number, data: Partial<EmailVerification>): Promise<void> {
    await this.prisma.emailVerification.update({ where: { id: verificationId }, data });
  }

  async findById(verificationId: number): Promise<EmailVerification | null> {
    const emailVerification = await this.prisma.emailVerification.findUnique({
      where: { id: verificationId },
    });

    return emailVerification ? this.authMapper.toEmailVerification(emailVerification) : null;
  }
}
