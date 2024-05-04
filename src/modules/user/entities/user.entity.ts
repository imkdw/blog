import { hash } from 'bcrypt';
import BaseEntity from '../../../common/domain/base.entity';

export default class User extends BaseEntity {
  constructor(user: Omit<User, 'hashPassword'>) {
    super();
    this.id = user.id;
    this.email = user.email;
    this.password = user.password;
    this.nickname = user.nickname;
    this.profile = user.profile;
    this.signupChannelId = user.signupChannelId;
    this.roleId = user.roleId;
    this.oAuthProviderId = user.oAuthProviderId;
  }

  id: string;
  email: string;
  password: string | null;
  nickname: string;
  profile: string;
  signupChannelId: number;
  roleId: number;
  oAuthProviderId: number | null;

  async hashPassword(salt: number) {
    if (this.password) {
      this.password = await hash(this.password, salt);
    }
  }
}

export class UserBuilder {
  private _id: string;
  private _email: string;
  private _password: string | null;
  private _nickname: string;
  private _profile: string;
  private _signupChannelId: number;
  private _roleId: number;
  private _oAuthProviderId: number | null;

  id(id: string): UserBuilder {
    this._id = id;
    return this;
  }

  email(email: string): UserBuilder {
    this._email = email;
    return this;
  }

  password(password: string | null): UserBuilder {
    this._password = password;
    return this;
  }

  nickname(nickname: string): UserBuilder {
    this._nickname = nickname;
    return this;
  }

  profile(profile: string): UserBuilder {
    this._profile = profile;
    return this;
  }

  signupChannelId(signupChannelId: number): UserBuilder {
    this._signupChannelId = signupChannelId;
    return this;
  }

  roleId(roleId: number): UserBuilder {
    this._roleId = roleId;
    return this;
  }

  oAuthProviderId(oAuthProviderId: number | null): UserBuilder {
    this._oAuthProviderId = oAuthProviderId;
    return this;
  }

  build(): User {
    return new User({
      id: this._id,
      email: this._email,
      password: this._password,
      nickname: this._nickname,
      profile: this._profile,
      signupChannelId: this._signupChannelId,
      roleId: this._roleId,
      oAuthProviderId: this._oAuthProviderId,
    });
  }
}
