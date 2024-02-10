import { Inject, Injectable } from '@nestjs/common';
import { SignUpUsecase } from '../port/in/usecases/sign-up.usecase';
import { SignUpCommand } from '../port/in/commands/auth-common.command';
import { SaveUserUsecase, SaveUserUsecaseSymbol } from '../../../user/application/port/in/usecases/save-user.usecase';
import { UserSignUpChannel } from '../../../user/domain/user.entity';

@Injectable()
export default class AuthCommonService implements SignUpUsecase {
  constructor(@Inject(SaveUserUsecaseSymbol) private readonly saveUserUsecase: SaveUserUsecase) {}

  commonSignUp(command: SignUpCommand): void {
    const { email, nickname, password } = command;
    this.saveUserUsecase.saveUser({ email, nickname, password, signUpChannelId: UserSignUpChannel.COMMON });
  }
}
