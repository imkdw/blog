import { FindOption } from '../../../common/interfaces/find-option.interface';
import UserSignupChannel from '../domain/entities/user-signup-channel.entity';

export const UserSignupChannelServiceKey = Symbol('UserSignupChannelServiceKey');
export interface IUserSignupChannelService {
  findByName(name: string, option: FindOption): Promise<UserSignupChannel>;
}

export const UserSignupChannelRepositoryKey = Symbol('UserSignupChannelRepositoryKey');
export interface IUserSignupChannelRepository {
  findByName(name: string, option: FindOption): Promise<UserSignupChannel>;
}
