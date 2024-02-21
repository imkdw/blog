import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ExOAuthDataRepository } from '../types/repository/ex-oauth-data.repository';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import ExternalOAuthData from '../domain/ex-oauth-data.entity';
import { toExOAuthData } from '../mapper/ex-oauth-data.mapper';
import { TX } from '../../../common/types/prisma';

@Injectable()
export default class ExOAuthDataPrismaRepository implements ExOAuthDataRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(data: ExternalOAuthData): Promise<ExternalOAuthData> {
    const row = await this.prisma.externalOAuthData.create({ data });
    return toExOAuthData(row);
  }

  async update(id: number, data: Prisma.externalOAuthDataUpdateInput): Promise<void> {
    await this.prisma.externalOAuthData.update({ where: { id }, data });
  }

  async findByEmailAndProvider(email: string, providerId: number): Promise<ExternalOAuthData | null> {
    const row = await this.prisma.externalOAuthData.findFirst({
      where: {
        email,
        providerId,
      },
    });

    return row ? toExOAuthData(row) : null;
  }

  async findByToken(token: string, tx?: TX): Promise<ExternalOAuthData | null> {
    const prisma = tx || this.prisma;
    const row = await prisma.externalOAuthData.findFirst({
      where: {
        token,
        deleteAt: null,
      },
    });
    return row ? toExOAuthData(row) : null;
  }
}
