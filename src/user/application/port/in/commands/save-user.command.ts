import { UserSignUpChannel } from '../../../../domain/user.entity';

export default class SaveUSerCommand {
  constructor(
    readonly email: string,
    readonly nickname: string,
    readonly password: string,
    readonly signUpChannelId: UserSignUpChannel,
  ) {}
}
