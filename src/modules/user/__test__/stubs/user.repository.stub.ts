/* eslint-disable @typescript-eslint/no-unused-vars */
import { FindOption } from '../../../../common/interfaces/find-option.interface';
import { TX } from '../../../../common/types/prisma';
import User, { UserBuilder } from '../../entities/user.entity';
import { IUserRepository } from '../../interfaces/user.interface';

export default class UserRepositoryStub implements IUserRepository {
  callUpdateCount = 0;

  async findByEmail(email: string, option?: FindOption): Promise<User> {
    return new UserBuilder().email(email).build();
  }

  async findById(id: string, option?: FindOption): Promise<User> {
    return new UserBuilder().id(id).build();
  }

  async findByNickname(nickname: string, option?: FindOption): Promise<User> {
    return new UserBuilder().nickname(nickname).build();
  }

  async save(user: User, tx: TX): Promise<User> {
    return user;
  }

  async update(userId: string, user: Partial<User>, tx: TX): Promise<void> {
    this.callUpdateCount += 1;
  }

  reset() {
    this.callUpdateCount = 0;
  }
}
