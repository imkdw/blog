export const AuthServiceKey = Symbol('AuthService');
export interface IAuthService {
  refreshToken(cookie: string): string;
}
