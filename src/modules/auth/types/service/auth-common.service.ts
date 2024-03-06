import { AuthResult } from '../dto/internal/auth-result.dto';
import { CommonSignInDto } from '../dto/internal/sign-in.dto';
import { CommonSignUpDto } from '../dto/internal/sign-up.dto';

export const AuthCommonServiceSymbol = Symbol('AuthCommonService');

export interface AuthCommonService {
  commonSignUp(dto: CommonSignUpDto): Promise<AuthResult>;

  commonSignIn(dto: CommonSignInDto): Promise<AuthResult>;
}
