import { SaveUSerCommand } from '../commands/save-user.command';

export const SaveUserUsecaseSymbol = Symbol('SaveUserUsecase');

export interface SaveUserUsecase {
  saveUser(command: SaveUSerCommand): void;
}
