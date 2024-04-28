import { PickType } from '@nestjs/swagger';
import { hash } from 'bcrypt';

import UserEntity from './user.entity';
import { generateUUID } from '../../../utils/uuid.util';
import { USER_DEFAULT_PROFILE } from '../constants/user.constant';

interface UserCreateEntityData extends Omit<UserCreateEntity, 'hashPassword'> {}
export default class UserCreateEntity extends PickType(UserEntity, [
  'id',
  'email',
  'password',
  'nickname',
  'profile',
  'signupChannelId',
  'roleId',
  'oAuthProviderId',
]) {
  constructor(data: UserCreateEntityData) {
    super();
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
    this.nickname = data.nickname;
    this.profile = data.profile;
    this.signupChannelId = data.signupChannelId;
    this.roleId = data.roleId;
    this.oAuthProviderId = data.oAuthProviderId;
  }

  async hashPassword(salt: number): Promise<void> {
    if (this.password) {
      this.password = await hash(this.password, salt);
    }
  }
}

export class UserCreateEntityBuilder {
  private id: string;

  private email: string;

  private password: string;

  private nickname: string;

  private profile: string;

  private signupChannelId: number;

  private roleId: number;

  private oAuthProviderId: number;

  setId(id: string): UserCreateEntityBuilder {
    this.id = id;
    return this;
  }

  setEmail(email: string): UserCreateEntityBuilder {
    this.email = email;
    return this;
  }

  setPassword(password: string): UserCreateEntityBuilder {
    this.password = password;
    return this;
  }

  setNickname(nickname: string): UserCreateEntityBuilder {
    this.nickname = nickname;
    return this;
  }

  setSignupChannelId(signupChannelId: number): UserCreateEntityBuilder {
    this.signupChannelId = signupChannelId;
    return this;
  }

  setRoleId(roleId: number): UserCreateEntityBuilder {
    this.roleId = roleId;
    return this;
  }

  setOAuthProviderId(oAuthProviderId: number): UserCreateEntityBuilder {
    this.oAuthProviderId = oAuthProviderId;
    return this;
  }

  build(): UserCreateEntity {
    this.id = generateUUID();
    this.profile = USER_DEFAULT_PROFILE;

    return new UserCreateEntity({
      id: this.id,
      email: this.email,
      password: this.password,
      nickname: this.nickname,
      profile: this.profile,
      signupChannelId: this.signupChannelId,
      roleId: this.roleId,
      oAuthProviderId: this.oAuthProviderId,
    });
  }
}
