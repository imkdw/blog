import { FindOption } from '../../../../common/types/interfaces/find-option.interface';
import ExternalOAuthProvider from '../../domain/ex-oauth-provider.entity';

export const ExOAuthProviderRepositorySymbol = Symbol('ExOAuthProviderRepository');

export interface ExOAuthProviderRepository {
  findByName(name: string, option: FindOption): Promise<ExternalOAuthProvider | null>;
}
