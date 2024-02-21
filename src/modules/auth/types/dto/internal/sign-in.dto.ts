export interface CommonSignInDto {
  email: string;
  password: string;
}

export interface SignInResult {
  email: string;
  accessToken: string;
  refreshToken: string;
}
