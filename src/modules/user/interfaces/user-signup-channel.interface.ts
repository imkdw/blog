import { FindOption } from '../../../common/interfaces/find-option.interface';
import UserSignupChannelEntity from '../entities/user-signup-channel/user-signup-channel.entity';

export const UserSignupChannelServiceKey = Symbol('UserSignupChannelServiceKey');
export interface IUserSignupChannelService {
  findByName(name: string, option?: FindOption): Promise<UserSignupChannelEntity | null>;
}

export const UserSignupChannelRepositoryKey = Symbol('UserSignupChannelRepositoryKey');
export interface IUserSignupChannelRepository {
  findByName(name: string, option?: FindOption): Promise<UserSignupChannelEntity | null>;
}
