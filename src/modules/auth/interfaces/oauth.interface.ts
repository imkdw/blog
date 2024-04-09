import { FindOption } from '../../../common/interfaces/find-option.interface';
import OAuthProvider from '../domain/oauth-provider/oauth-provider.domain';
import CreateOAuthData from '../domain/oauth-data/create';
import OAuthData from '../domain/oauth-data/oauth-data.domain';
import { AuthResult } from '../dto/internal/auth-result.dto';
import { OAuthDto, OAuthResult } from '../dto/internal/oauth.dto';
import { IOAuthProviders } from '../enums/auth.enum';

export const OAuthServiceKey = Symbol('OAuthService');
export interface IOAuthService {
  googleOAuth(authorization: string): Promise<OAuthResult>;

  kakaoOAuth(code: string, redirectUri: string): Promise<OAuthResult>;

  githubOAuth(code: string, redirectUri: string): Promise<OAuthResult>;

  oAuthSignUp(dto: OAuthDto): Promise<AuthResult>;

  oAuthSignIn(dto: OAuthDto): Promise<AuthResult>;
}

export const OAuthDataRepositoryKey = Symbol('OAuthDataRepository');
export interface IOAuthDataRepository {
  save(data: CreateOAuthData): Promise<OAuthData>;

  update(id: number, data: Partial<OAuthData>): Promise<void>;

  findOne(dto: Partial<OAuthData>, option: FindOption): Promise<OAuthData | null>;
}

export const OAuthProviderRepositoryKey = Symbol('OAuthProviderRepository');
export interface IOAuthProviderRepository {
  findOne(dto: Partial<OAuthProvider>, option: FindOption): Promise<OAuthProvider | null>;
}

export interface GoogleOAuthUserInfoResponse {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
  hd: string;
}

export interface PostKakaoTokenBody {
  grant_type: string;
  client_id: string;
  redirect_uri: string;
  code: string;
}

export interface PostKakaoTokenResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: string;
  scope: string;
  refresh_token_expires_in: string;
}

export interface GetKakaoUserResponse {
  id: number;
  connected_at: string;
  properties: {
    profile_image: string;
    thumbnail_image: string;
  };
  kakao_account: {
    profile_image_needs_agreement: boolean;
    profile: {
      thumbnail_image_url: string;
      profile_image_url: string;
      is_default_image: boolean;
    };
    has_email: boolean;
    email_needs_agreement: boolean;
    is_email_valid: boolean;
    is_email_verified: boolean;
    email: string;
  };
}

export interface PostGithubTokenBody {
  client_id: string;
  client_secret: string;
  code: string;
  redirect_uri: string;
}

export interface PostGithubTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

export interface GetGithubUserResponse {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: false;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: string | null;
  bio: string;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  private_gists: number;
  total_private_repos: number;
  owned_private_repos: number;
  disk_usage: number;
  collaborators: number;
  two_factor_authentication: true;
  plan: {
    name: string;
    space: number;
    collaborators: number;
    private_repos: number;
  };
}

export interface ProcessOAuthResult {
  isExist: boolean;
  token: string;
  email: string;
  provider: IOAuthProviders;
}
