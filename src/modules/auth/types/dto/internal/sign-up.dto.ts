export interface CommonSignUpDto {
  email: string;
  password: string;
  nickname: string;
}

export interface SignUpResult {
  email: string;
  accessToken: string;
  refreshToken: string;
}
