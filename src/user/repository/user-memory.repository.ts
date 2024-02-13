import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '../types/user.repository';
import User from '../domain/user.entity';

@Injectable()
export default class UserMemoryRepository implements UserRepository {
  private readonly users: User[] = [];

  saveUser(user: User): void {
    const [userByEmail, userByNickname] = [this.findUserByEmail(user.email), this.findUserByNickname(user.nickname)];
    if (userByEmail) {
      // TODO: 중복된 이메일 에러처리
      throw new ConflictException('이미 존재하는 이메일입니다.');
    } else if (userByNickname) {
      // TODO: 중복된 닉네임 에러처리
      throw new ConflictException('이미 존재하는 닉네임입니다.');
    }

    this.users.push(user);
    console.log(this.users);
  }

  findUserByEmail(email: string): User | null {
    return this.users.find((user) => user.email === email) || null;
  }

  findUserByNickname(nickname: string): User | null {
    return this.users.find((user) => user.nickname === nickname) || null;
  }
}
