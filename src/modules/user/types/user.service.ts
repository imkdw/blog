import User from '../domain/user.entity';
import SaveUserDto from './dto/internal/save-user.dto';

export const UserServiceSymbol = Symbol('UserService');

export interface UserService {
  // 사용자 저장
  saveUser(dto: SaveUserDto): void;

  // 이메일로 사용자 찾기
  findUserByEmail(email: string): User | null;
}
