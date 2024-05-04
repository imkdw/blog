import { Injectable } from '@nestjs/common';
import { IOAuthProviderRepository } from '../interfaces/oauth.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import OAuthProvider from '../entities/oauth-provider.entity';

@Injectable()
export default class OAuthProviderRepository implements IOAuthProviderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByName(name: string, option?: FindOption): Promise<OAuthProvider | null> {
    const row = await this.prisma.oAuthProvider.findUnique({
      where: { name, ...(option?.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? new OAuthProvider(row) : null;
  }
}
