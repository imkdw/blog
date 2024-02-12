import { SignUpCommand } from '../commands/auth-common.command';

export const SignUpUsecaseSymbol = Symbol('SignUpUsecase');

export interface SignUpUsecase {
  commonSignUp(command: SignUpCommand): void;
}
