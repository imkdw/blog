import { Injectable } from '@nestjs/common';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import OAuthData from '../entities/oauth-data/oauth-data.entity';

@Injectable()
export default class OAuthDataRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(oAuthData: OAuthData): Promise<OAuthData> {
    const row = await this.prisma.oAuthData.create({
      data: {
        email: oAuthData.email,
        token: oAuthData.token,
        providerId: oAuthData.providerId,
        profile: oAuthData.profile,
        data: oAuthData.data,
      },
    });
    return new OAuthData(row);
  }

  async update(id: number, data: Partial<OAuthData>): Promise<void> {
    await this.prisma.oAuthData.update({ where: { id }, data });
  }

  async findByIdAndEmail({ id, email }: { id: number; email: string }, option?: FindOption): Promise<OAuthData | null> {
    const row = await this.prisma.oAuthData.findFirst({
      where: { id, email, ...(option?.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? new OAuthData(row) : null;
  }

  async findByToken(token: string, option?: FindOption): Promise<OAuthData | null> {
    const row = await this.prisma.oAuthData.findFirst({
      where: { token, ...(option?.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? new OAuthData(row) : null;
  }
}
