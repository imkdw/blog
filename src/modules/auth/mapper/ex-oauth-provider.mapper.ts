import { externalOAuthProviders } from '@prisma/client';
import ExternalOAuthProvider, { IOAuthProvider } from '../domain/ex-oauth-provider';

// eslint-disable-next-line import/prefer-default-export
export function toExOAuthProvider(_provider: externalOAuthProviders): ExternalOAuthProvider {
  return {
    ..._provider,
    name: _provider.name as IOAuthProvider,
  };
}
