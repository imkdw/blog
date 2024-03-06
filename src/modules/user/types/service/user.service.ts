import { TX } from '../../../../common/types/prisma';
import User from '../../domain/user.entity';
import { CreateUserDto } from '../dto/internal/save-user.dto';
import { UpdateUserDto } from '../dto/internal/update-user.dto';

export const UserServiceSymbol = Symbol('UserService');

export interface UserService {
  // 사용자 저장
  createUser(dto: CreateUserDto, tx?: TX): Promise<User>;

  // 사용자 업데이트
  updateUser(userId: string, dto: UpdateUserDto): Promise<User>;

  // 아이디로 사용자 찾기
  findById(userId: string): Promise<User | null>;

  // 아이디 목록으로 사용자 찾기
  findManyByIds(userIds: string[]): Promise<User[]>;

  // 이메일로 사용자 찾기
  findByEmail(email: string): Promise<User | null>;

  // 닉네임으로 사용자 찾기
  findByNickname(nickname: string): Promise<User | null>;
}
