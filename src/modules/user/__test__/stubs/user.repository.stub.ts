/* eslint-disable @typescript-eslint/no-unused-vars */
import { FindOption } from '../../../../common/interfaces/find-option.interface';
import { TX } from '../../../../common/types/prisma';
import User from '../../entities/user.entity';
import { IUserRepository } from '../../interfaces/user.interface';

export default class UserRepositoryStub implements IUserRepository {
  private memory: User[] = [];

  isCallUpdate = false;

  async findByEmail(email: string, option?: FindOption): Promise<User | null> {
    const user = this.memory.find((item) => item.email === email);
    if (!user) return null;
    if (option?.includeDeleted && user?.deleteAt) return null;

    return user;
  }

  async findById(id: string, option?: FindOption): Promise<User | null> {
    const user = this.memory.find((item) => item.id === id);
    if (!user) return null;
    if (option?.includeDeleted && user?.deleteAt) return null;

    return user;
  }

  async save(user: User, tx?: TX): Promise<User> {
    this.memory.push(user);
    return user;
  }

  async findByNickname(nickname: string, option?: FindOption): Promise<User | null> {
    const user = this.memory.find((item) => item.nickname === nickname);
    if (!user) return null;
    if (option?.includeDeleted && user?.deleteAt) return null;

    return user;
  }

  async update(userId: string, user: Partial<User>, tx: TX): Promise<void> {
    this.isCallUpdate = true;
    const target = this.memory.find((item) => item.id === userId);
    if (!target) return;

    const index = this.memory.indexOf(target);
    this.memory[index] = { ...target, ...user } as User;
  }

  reset() {
    this.memory = [];
    this.isCallUpdate = false;
  }
}
