import ExternalOAuthProvider from '../../domain/ex-oauth-provider';

export const ExOAuthProviderRepositorySymbol = Symbol('ExOAuthProviderRepository');

export interface ExOAuthProviderRepository {
  findByName(name: string): Promise<ExternalOAuthProvider | null>;
}
