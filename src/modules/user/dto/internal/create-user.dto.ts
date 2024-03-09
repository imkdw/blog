export interface CreateUserDto {
  email: string;
  nickname: string;
  password: string;
  roleId: number;
  signupChannelId: number;
  oAuthProviderId: number | null;
}
