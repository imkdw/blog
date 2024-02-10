import { Inject, Injectable } from '@nestjs/common';
import { SaveUserUsecase } from './port/in/usecases/save-user.usecase';
import { SaveUSerCommand } from './port/in/commands/save-user.command';
import { UserRepositorySymbol } from './port/out/user.repository';
import UserMemoryAdapter from '../adapter/out/user-memory.adapter';
import User from '../domain/user.entity';

@Injectable()
export default class UserService implements SaveUserUsecase {
  constructor(@Inject(UserRepositorySymbol) private readonly userMemoryAdapter: UserMemoryAdapter) {}

  saveUser(command: SaveUSerCommand): void {
    // TODO: SignUpChannelId를 UserSignUpChannel에서 가져와야 함
    const signUpChannelId = 1;

    const user = new User(command.email, command.password, command.nickname, signUpChannelId);
    this.userMemoryAdapter.saveUser(user);
  }
}
