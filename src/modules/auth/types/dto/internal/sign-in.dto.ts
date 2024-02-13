export interface CommonSignInDto {
  email: string;
  password: string;
}

export interface CommonSignInResult {
  email: string;
  accessToken: string;
  refreshToken: string;
}
