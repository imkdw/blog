import { OmitType } from '@nestjs/swagger';
import { hash } from 'bcrypt';
import User from '../entities/user.entity';

export default class RegisteringUser extends OmitType(User, ['id']) {
  constructor(
    email: string,
    password: string | null,
    nickname: string,
    profile: string,
    roleId: number,
    signupChannelId: number,
    oAuthProviderId: number | null,
    createUser: string,
    updateUser: string,
  ) {
    super();
    this.email = email;
    this.password = password;
    this.nickname = nickname;
    this.profile = profile;
    this.roleId = roleId;
    this.signupChannelId = signupChannelId;
    this.oAuthProviderId = oAuthProviderId;
    this.createUser = createUser;
    this.updateUser = updateUser;
  }

  async hashPassword(salt: number): Promise<void> {
    this.password = await hash(this.password, salt);
  }
}
