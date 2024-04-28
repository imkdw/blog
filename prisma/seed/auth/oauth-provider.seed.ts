import { oAuthProvider } from '@prisma/client';
import { OAuthProvider } from '../../../src/modules/auth/enums/auth.enum';

const oAuthProviderSeed: Pick<oAuthProvider, 'name'>[] = [
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
