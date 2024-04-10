import { Injectable } from '@nestjs/common';
import { IOAuthProviderRepository } from '../interfaces/oauth.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import OAuthProvider from '../domain/oauth-provider/oauth-provider.domain';

@Injectable()
export default class OAuthProviderRepository implements IOAuthProviderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(dto: Partial<OAuthProvider>, option: FindOption): Promise<OAuthProvider | null> {
    const row = await this.prisma.oAuthProvider.findFirst({
      where: { ...dto, ...(!option.includeDeleted && { deleteAt: null }) },
    });

    return row ? new OAuthProvider(row) : null;
  }
}
