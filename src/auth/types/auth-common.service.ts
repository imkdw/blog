import SignUpDto from './dto/internal/sign-up.dto';

export const AuthCommonServiceSymbol = Symbol('AuthCommonService');

export interface AuthCommonService {
  commonSignUp(dto: SignUpDto): void;
}
