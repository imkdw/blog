import { CommonSignInDto, CommonSignInResult } from './dto/internal/sign-in.dto';
import { CommonSignUpDto, CommonSignUpResult } from './dto/internal/sign-up.dto';

export const AuthCommonServiceSymbol = Symbol('AuthCommonService');

export interface AuthCommonService {
  // 일반 회원가입
  commonSignUp(dto: CommonSignUpDto): CommonSignUpResult;

  // 일반 로그인
  commonSignIn(dto: CommonSignInDto): CommonSignInResult;
}
