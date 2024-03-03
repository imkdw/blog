import { Prisma } from '@prisma/client';
import UserSignUpChannel from '../../domain/user-signup-channel.entity';
import User from '../../domain/user.entity';
import UserRole from '../../domain/user-role.entity';
import { TX } from '../../../../common/types/prisma';

export const UserRepositorySymbol = Symbol('UserRepository');

export interface UserRepository {
  saveUser(user: User, tx?: TX): Promise<User>;

  updateUser(userId: string, data: Prisma.usersUpdateInput, tx?: TX): Promise<User>;

  findManyByIds(userIds: string[]): Promise<User[]>;

  findUserByEmail(email: string): Promise<User | null>;

  findUserByNickname(nickname: string): Promise<User | null>;

  findUserById(userId: string): Promise<User | null>;

  findUserSignUpChannelByName(name: string, tx?: TX): Promise<UserSignUpChannel | null>;

  findUserRoleByName(name: string, tx?: TX): Promise<UserRole | null>;

  findUserRoleById(roleId: number): Promise<UserRole | null>;
}
