import SaveUserCommand from '../commands/save-user.command';

export const SaveUserUsecaseSymbol = Symbol('SaveUserUsecase');

export interface SaveUserUsecase {
  saveUser(command: SaveUserCommand): void;
}
