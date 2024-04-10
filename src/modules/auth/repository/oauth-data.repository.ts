import { Injectable } from '@nestjs/common';
import { IOAuthDataRepository } from '../interfaces/oauth.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import OAuthData from '../domain/oauth-data/oauth-data.domain';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import CreateOAuthData from '../domain/oauth-data/create';

@Injectable()
export default class OAuthDataRepository implements IOAuthDataRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(dto: Partial<OAuthData>, option: FindOption): Promise<OAuthData | null> {
    const row = await this.prisma.oAuthData.findFirst({
      where: { ...dto, ...(!option.includeDeleted && { deleteAt: null }) },
    });
    return row ? new OAuthData(row) : null;
  }

  async save(newOAuthAuthenticate: CreateOAuthData): Promise<OAuthData> {
    const row = await this.prisma.oAuthData.create({ data: newOAuthAuthenticate });
    return new OAuthData(row);
  }

  async update(id: number, data: Partial<OAuthData>): Promise<void> {
    await this.prisma.oAuthData.update({ where: { id }, data });
  }
}
