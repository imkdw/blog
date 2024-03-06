import { FindOption } from '../../../../common/types/interfaces/find-option.interface';
import ExternalOAuthProvider from '../../domain/ex-oauth-provider.entity';

export const ExOAuthProviderServiceSymbol = Symbol('ExOAuthProviderService');

export interface ExOAuthProviderService {
  findByName(name: string, option: FindOption): Promise<ExternalOAuthProvider | null>;
}
