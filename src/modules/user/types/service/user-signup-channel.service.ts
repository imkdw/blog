import { FindOption } from '../../../../common/types/interfaces/find-option.interface';
import UserSignUpChannel from '../../domain/user-signup-channel.entity';

export const UserSignupChannelServiceSymbol = Symbol('UserChannelService');

export interface UserSignupChannelService {
  findByName(name: string, option: FindOption): Promise<UserSignUpChannel | null>;
}
