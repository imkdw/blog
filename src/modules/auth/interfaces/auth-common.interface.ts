import { SigninDto, SignupDto } from '../dto/internal/auth-common.dto';
import { AuthResult } from '../dto/internal/auth-result.dto';

export const AuthCommonServiceKey = Symbol('AuthCommonService');

export interface IAuthCommonService {
  signup(dto: SignupDto): Promise<AuthResult>;

  signin(dto: SigninDto): Promise<AuthResult>;
}
