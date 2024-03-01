export interface CommonSignInDto {
  email: string;
  password: string;
}

export interface SignInResult {
  email: string;
  nickname: string;
  profile: string;
  accessToken: string;
  refreshToken: string;
}
