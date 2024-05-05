import OAuthProvider from '../../../src/modules/auth/entities/oauth-provider.entity';
import { OAuthProviders } from '../../../src/modules/auth/enums/auth.enum';

const oAuthProviderSeed: Pick<OAuthProvider, 'name'>[] = [
  {
    name: OAuthProviders.GOOGLE,
  },
  {
    name: OAuthProviders.GITHUB,
  },
  {
    name: OAuthProviders.KAKAO,
  },
];

export default oAuthProviderSeed;
