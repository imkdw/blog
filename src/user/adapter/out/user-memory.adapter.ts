import { UserRepository } from '../../application/port/out/user.repository';
import User from '../../domain/user.entity';

export default class UserMemoryAdapter implements UserRepository {
  private users: User[] = [];

  saveUser(user: User) {
    this.users.push(user);
  }
}
