import { FindOption } from '../../../../common/types/interfaces/find-option.interface';
import UserSignUpChannel from '../../domain/user-signup-channel.entity';

export const UserSignupChannelRepositorySymbol = Symbol('UserSignupChannelRepository');

export interface UserSignupChannelRepository {
  findByName(name: string, option: FindOption): Promise<UserSignUpChannel | null>;
}
