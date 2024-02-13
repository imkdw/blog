import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../types/user.service';
import SaveUserDto from '../types/dto/internal/save-user.dto';
import { UserRepository, UserRepositorySymbol } from '../types/user.repository';
import User from '../domain/user.entity';

@Injectable()
export default class UserServiceImpl implements UserService {
  constructor(@Inject(UserRepositorySymbol) private readonly userRepository: UserRepository) {}

  saveUser(dto: SaveUserDto): void {
    const { email, nickname, password } = dto;
    const user = new User(email, password, nickname, 1);
    this.userRepository.saveUser(user);
  }
}
