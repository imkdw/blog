import { Injectable } from '@nestjs/common';
import { ExOAuthProviderRepository } from '../types/repository/ex-oauth-provider.repository';
import ExternalOAuthProvider from '../domain/ex-oauth-provider.entity';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { toExOAuthProvider } from '../mapper/ex-oauth-provider.mapper';
import { FindOption } from '../../../common/types/interfaces/find-option.interface';

@Injectable()
export default class ExOAuthProviderPrismaRepository implements ExOAuthProviderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByName(name: string, option: FindOption): Promise<ExternalOAuthProvider | null> {
    const row = await this.prisma.externalOAuthProviders.findUnique({
      where: { name, ...(option.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? toExOAuthProvider(row) : null;
  }
}
