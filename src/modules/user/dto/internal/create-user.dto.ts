import User from '../../entities/user.entity';

export interface CreateUserDto
  extends Pick<User, 'email' | 'nickname' | 'password' | 'roleId' | 'signupChannelId' | 'oAuthProviderId'> {}
