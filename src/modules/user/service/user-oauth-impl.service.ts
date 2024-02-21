import { Inject, Injectable } from '@nestjs/common';
import { UserOAuthService } from '../types/service/user-oauth.service';
import UserOAuth from '../domain/user-oauth.entity';
import { UserOAuthRepository, UserOAuthRepositorySymbol } from '../types/repository/user-oauth.repository';
import { CreateUserOAuthDto } from '../types/dto/internal/create-user-oauth.dto';
import { TX } from '../../../common/types/prisma';

@Injectable()
export default class UserOAuthServiceImpl implements UserOAuthService {
  constructor(@Inject(UserOAuthRepositorySymbol) private readonly userOAuthRepository: UserOAuthRepository) {}

  async findById(userId: string): Promise<UserOAuth | null> {
    const userOAuth = await this.userOAuthRepository.findById(userId);
    return userOAuth;
  }

  async createUserOAuth(dto: CreateUserOAuthDto, tx?: TX): Promise<UserOAuth> {
    const userOAuth = new UserOAuth({
      userId: dto.userId,
      providerId: dto.providerId,
      createUser: dto.userId,
      updateUser: dto.userId,
    });

    const createdUserOAuth = await this.userOAuthRepository.save(userOAuth, tx);
    return createdUserOAuth;
  }
}
