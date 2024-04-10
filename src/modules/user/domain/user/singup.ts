import { PickType } from '@nestjs/swagger';
import { hash } from 'bcrypt';
import User from './user.domain';
import { USER_DEFAULT_PROFILE } from '../../constants/user.constant';

export default class SignupUser extends PickType(User, [
  'email',
  'nickname',
  'password',
  'signupChannelId',
  'roleId',
  'oAuthProviderId',
]) {
  profile: string;

  constructor(data: Omit<SignupUser, 'hashPassword' | 'profile'>) {
    super();
    this.email = data.email;
    this.password = data.password;
    this.nickname = data.nickname;
    this.signupChannelId = data.signupChannelId;
    this.roleId = data.roleId;
    this.oAuthProviderId = data.oAuthProviderId;
    this.profile = USER_DEFAULT_PROFILE;
  }

  async hashPassword(salt: number): Promise<SignupUser> {
    if (this.password) {
      this.password = await hash(this.password, salt);
    }

    return this;
  }
}
