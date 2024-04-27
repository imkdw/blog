import { ClassProvider } from '@nestjs/common';
import { AuthServiceKey } from '../interfaces/auth.interface';
import AuthService from '../services/auth.service';

// eslint-disable-next-line import/prefer-default-export
export const AuthServiceProvider: ClassProvider = {
  provide: AuthServiceKey,
  useClass: AuthService,
};
