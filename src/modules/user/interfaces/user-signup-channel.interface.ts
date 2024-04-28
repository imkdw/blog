import { FindOption } from '../../../common/interfaces/find-option.interface';
import UserSignupChannel from '../domain/user-signup-channel/user-signup-channel.domain';

export const UserSignupChannelServiceKey = Symbol('UserSignupChannelServiceKey');
export interface IUserSignupChannelService {
  findByName(name: string, option?: FindOption): Promise<UserSignupChannel | null>;
}

export const UserSignupChannelRepositoryKey = Symbol('UserSignupChannelRepositoryKey');
export interface IUserSignupChannelRepository {
  findByName(name: string, option?: FindOption): Promise<UserSignupChannel | null>;
}
