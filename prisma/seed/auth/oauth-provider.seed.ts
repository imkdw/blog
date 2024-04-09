import { oAuthProvider } from '@prisma/client';
import { OAuthProviders } from '../../../src/modules/auth/enums/auth.enum';

const oAuthProviderSeed: Pick<oAuthProvider, 'name'>[] = [
  {
    name: OAuthProviders.GITHUB,
  },
  {
    name: OAuthProviders.GOOGLE,
  },
  {
    name: OAuthProviders.KAKAO,
  },
];

export default oAuthProviderSeed;
