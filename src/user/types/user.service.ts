import SaveUserDto from './dto/internal/save-user.dto';

export const UserServiceSymbol = Symbol('UserService');

export interface UserService {
  saveUser(dto: SaveUserDto): void;
}
