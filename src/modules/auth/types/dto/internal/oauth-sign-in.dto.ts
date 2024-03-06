import { IOAuthProvider } from '../../../domain/ex-oauth-provider.entity';

export interface OAuthSignInDto {
  email: string;
  provider: IOAuthProvider;
  token: string;
}
