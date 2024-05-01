import UserEntity from '../../entities/user.entity';

export interface CreateUserDto
  extends Pick<UserEntity, 'email' | 'nickname' | 'password' | 'roleId' | 'signupChannelId' | 'oAuthProviderId'> {}
