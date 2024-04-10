import User from '../../domain/user/user.domain';

export interface CreateUserDto
  extends Pick<User, 'email' | 'nickname' | 'password' | 'roleId' | 'signupChannelId' | 'oAuthProviderId'> {}
