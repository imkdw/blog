import { SigninDto } from '../dto/internal/auth-common.dto';
import { AuthResult } from '../dto/internal/auth-result.dto';

export const AuthCommonServiceKey = Symbol('AuthCommonService');

export interface IAuthCommonService {
  signin(dto: SigninDto): Promise<AuthResult>;
}
