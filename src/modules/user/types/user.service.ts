import UserRole from '../domain/user-role.entity';
import User from '../domain/user.entity';
import { SaveUserDto } from './dto/internal/save-user.dto';
import { UpdateUserDto } from './dto/internal/update-user.dto';

export const UserServiceSymbol = Symbol('UserService');

export interface UserService {
  // 사용자 저장
  createUser(dto: SaveUserDto): Promise<User>;

  // 사용자 업데이트
  updateUser(userId: string, dto: UpdateUserDto): Promise<User>;

  // 이메일로 사용자 찾기
  findByEmail(email: string): Promise<User | null>;

  // 닉네임으로 사용자 찾기
  findByNickname(nickname: string): Promise<User | null>;

  // 유저 권한 찾기
  findUserRoleById(roleId: number): Promise<UserRole | null>;
}
