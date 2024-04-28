import { Injectable } from '@nestjs/common';
import { IOAuthDataRepository } from '../interfaces/oauth.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import OAuthDataEntity from '../entities/oauth-data/oauth-data.entity';
import OAuthDataCreateEntity from '../entities/oauth-data/oauth-data-create.entity';

@Injectable()
export default class OAuthDataRepository implements IOAuthDataRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(newOAuthAuthenticate: OAuthDataCreateEntity): Promise<OAuthDataEntity> {
    const row = await this.prisma.oAuthData.create({ data: newOAuthAuthenticate });
    return new OAuthDataEntity(row);
  }

  async update(id: number, data: Partial<OAuthDataEntity>): Promise<void> {
    await this.prisma.oAuthData.update({ where: { id }, data });
  }

  async findByIdAndEmail(
    { id, email }: { id: number; email: string },
    option?: FindOption,
  ): Promise<OAuthDataEntity | null> {
    const row = await this.prisma.oAuthData.findFirst({
      where: { id, email, ...(option.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? new OAuthDataEntity(row) : null;
  }

  async findByToken(token: string, option?: FindOption): Promise<OAuthDataEntity | null> {
    const row = await this.prisma.oAuthData.findFirst({
      where: { token, ...(option.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? new OAuthDataEntity(row) : null;
  }
}
