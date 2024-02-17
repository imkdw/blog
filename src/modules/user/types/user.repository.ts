import { Prisma } from '@prisma/client';
import UserSignUpChannel from '../domain/user-signup-channel.entity';
import User from '../domain/user.entity';
import UserRole from '../domain/user-role.entity';

export const UserRepositorySymbol = Symbol('UserRepository');

export interface UserRepository {
  saveUser(user: User): Promise<User>;

  updateUser(userId: string, data: Prisma.usersUpdateInput): Promise<User>;

  findUserByEmail(email: string): Promise<User | null>;

  findUserByNickname(nickname: string): Promise<User | null>;

  findUserById(userId: string): Promise<User | null>;

  findUserSignUpChannelByName(name: string): Promise<UserSignUpChannel | null>;

  findUserRoleByName(name: string): Promise<UserRole | null>;

  findUserRoleById(roleId: number): Promise<UserRole | null>;
}
