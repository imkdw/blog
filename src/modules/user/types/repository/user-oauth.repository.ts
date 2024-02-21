import { TX } from '../../../../common/types/prisma';
import UserOAuth from '../../domain/user-oauth.entity';

export const UserOAuthRepositorySymbol = Symbol('UserOAuthRepository');

export interface UserOAuthRepository {
  findById(userId: string): Promise<UserOAuth | null>;

  save(userOAuth: UserOAuth, tx?: TX): Promise<UserOAuth>;
}
