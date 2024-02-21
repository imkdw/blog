import { TX } from '../../../../common/types/prisma';
import UserOAuth from '../../domain/user-oauth.entity';
import { CreateUserOAuthDto } from '../dto/internal/create-user-oauth.dto';

export const UserOAuthServiceSymbol = Symbol('UserOAuthService');

export interface UserOAuthService {
  findById(userId: string): Promise<UserOAuth | null>;

  createUserOAuth(dto: CreateUserOAuthDto, tx?: TX): Promise<UserOAuth>;
}
