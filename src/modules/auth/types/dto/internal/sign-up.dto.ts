export interface CommonSignUpDto {
  email: string;
  password: string;
  nickname: string;
}

export interface CommonSignUpResult {
  email: string;
  accessToken: string;
  refreshToken: string;
}
