/* eslint-disable @typescript-eslint/no-unused-vars */

import { FindOption } from '../../../../common/interfaces/find-option.interface';
import oAuthProviderSeed from '../../../../prisma/seed/auth/oauth-provider.seed';
import OAuthProvider from '../../entities/oauth-provider.entity';
import { IOAuthProviderRepository } from '../../interfaces/oauth.interface';

export default class OAuthProviderRepositoryStub implements IOAuthProviderRepository {
  private memory: OAuthProvider[] = [];

  async findByName(name: string, option?: FindOption): Promise<OAuthProvider> {
    return this.memory.find((oAuthProvider) => oAuthProvider.name === name);
  }

  init() {
    oAuthProviderSeed.map((oAuthProvider, index) =>
      this.memory.push(
        new OAuthProvider({
          id: index + 1,
          name: oAuthProvider.name,
        }),
      ),
    );
  }

  reset() {
    this.memory = [];
  }
}
