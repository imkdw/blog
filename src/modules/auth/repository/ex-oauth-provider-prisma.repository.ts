import { Injectable } from '@nestjs/common';
import { ExOAuthProviderRepository } from '../types/repository/ex-oauth-provider.repository';
import ExternalOAuthProvider from '../domain/ex-oauth-provider';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { toExOAuthProvider } from '../mapper/ex-oauth-provider.mapper';

@Injectable()
export default class ExOAuthProviderPrismaRepository implements ExOAuthProviderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByName(name: string): Promise<ExternalOAuthProvider | null> {
    const row = await this.prisma.externalOAuthProviders.findUnique({ where: { name, deleteAt: null } });
    return row ? toExOAuthProvider(row) : null;
  }
}
