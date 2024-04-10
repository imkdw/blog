import BaseEntity from '../../../../common/domain/base.entity';

export default class User extends BaseEntity {
  constructor(user: User) {
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

  password?: string | null;

  nickname: string;

  profile: string;

  signupChannelId: number;

  roleId: number;

  oAuthProviderId?: number | null;
}
