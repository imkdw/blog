import { externalOAuthProviders } from '@prisma/client';
import { OAuthProvider } from '../../../src/modules/auth/domain/ex-oauth-provider.entity';

const oAuthProviderSeed: Pick<externalOAuthProviders, 'name'>[] = [
  {
    name: OAuthProvider.GITHUB,
  },
  {
    name: OAuthProvider.GOOGLE,
  },
  {
    name: OAuthProvider.KAKAO,
  },
];

export default oAuthProviderSeed;
