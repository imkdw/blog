import { IOAuthProvider } from '../../../domain/ex-oauth-provider';

export interface OAuthSignInDto {
  email: string;
  provider: IOAuthProvider;
  token: string;
}
