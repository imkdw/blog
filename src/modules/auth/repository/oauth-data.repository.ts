import { Inject, Injectable } from '@nestjs/common';
import { IOAuthDataRepository } from '../interfaces/oauth.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import OAuthData from '../domain/entities/oauth-data.entity';
import { AuthMapperKey, IAuthMapper } from '../interfaces/auth.interface';
import NewOAuthAuthenticate from '../domain/models/new-oauth-authenticate.model';
import { FindOption } from '../../../common/interfaces/find-option.interface';

@Injectable()
export default class OAuthDataRepository implements IOAuthDataRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(AuthMapperKey) private readonly authMapper: IAuthMapper,
  ) {}

  async findByEmailAndProviderId(email: string, providerId: number, option: FindOption): Promise<OAuthData> {
    const row = await this.prisma.oAuthData.findFirst({
      where: { email, providerId, ...(option.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? this.authMapper.toOAuthData(row) : null;
  }

  async findByToken(token: string, option: FindOption): Promise<OAuthData> {
    const row = await this.prisma.oAuthData.findFirst({
      where: { token, ...(option.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? this.authMapper.toOAuthData(row) : null;
  }

  async save(newOAuthAuthenticate: NewOAuthAuthenticate): Promise<OAuthData> {
    const row = await this.prisma.oAuthData.create({ data: newOAuthAuthenticate });
    return this.authMapper.toOAuthData(row);
  }

  async update(id: number, data: Partial<OAuthData>): Promise<void> {
    await this.prisma.oAuthData.update({ where: { id }, data });
  }
}
