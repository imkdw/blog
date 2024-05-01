/* eslint-disable @typescript-eslint/no-unused-vars */

import { IAuthService } from '../../interfaces/auth.interface';

export default class AuthServiceStub implements IAuthService {
  refreshToken(cookie: string): string {
    return `accessToken`;
  }
}
