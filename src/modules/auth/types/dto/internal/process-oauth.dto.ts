import { IOAuthProvider } from '../../../domain/ex-oauth-provider.entity';

export interface ProcessOAuthDto {
  email: string;
  provider: IOAuthProvider;
  profile: string;
  data: string;
}

export interface ProcessOAuthResult {
  // 기존에 가입한 회원여부
  isExist: boolean;

  token: string;

  email: string;

  provider: IOAuthProvider;
}
