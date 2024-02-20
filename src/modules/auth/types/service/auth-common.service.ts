import { CommonSignInDto, SignInResult } from '../dto/internal/sign-in.dto';
import { CommonSignUpDto } from '../dto/internal/sign-up.dto';

export const AuthCommonServiceSymbol = Symbol('AuthCommonService');

export interface AuthCommonService {
  // 일반 회원가입
  commonSignUp(dto: CommonSignUpDto): Promise<SignInResult>;

  // 일반 로그인
  commonSignIn(dto: CommonSignInDto): Promise<SignInResult>;
}
