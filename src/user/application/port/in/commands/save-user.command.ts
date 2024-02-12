import { IUserSignUpChannel } from '../../../../domain/user.entity';

export default class SaveUserCommand {
  constructor(
    readonly email: string,
    readonly nickname: string,
    readonly password: string,
    readonly signUpChannelId: IUserSignUpChannel,
  ) {}
}
