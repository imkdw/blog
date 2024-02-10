import User from '../../../domain/user.entity';

export const UserRepositorySymbol = Symbol('UserRepository');

export interface UserRepository {
  saveUser(user: User): void;
}
