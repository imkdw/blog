import { Inject, Injectable } from '@nestjs/common';
import { IOAuthProviderRepository } from '../interfaces/oauth.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import OAuthProvider from '../domain/entities/oauth-provider.entity';
import { AuthMapperKey, IAuthMapper } from '../interfaces/auth.interface';

@Injectable()
export default class OAuthProviderRepository implements IOAuthProviderRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(AuthMapperKey) private readonly authMapper: IAuthMapper,
  ) {}

  async findByName(name: string): Promise<OAuthProvider> {
    const row = await this.prisma.oAuthProvider.findFirst({
      where: {
        name,
      },
    });

    return row ? this.authMapper.toOAuthProvider(row) : null;
  }
}
