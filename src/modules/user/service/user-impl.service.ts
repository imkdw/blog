import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../types/service/user.service';
import { UserRepository, UserRepositorySymbol } from '../types/repository/user.repository';
import User from '../domain/user.entity';
import { SaveUserDto } from '../types/dto/internal/save-user.dto';
import { SYSTEM_USER_ID } from '../../../common/constants/system.constant';
import { UpdateUserDto } from '../types/dto/internal/update-user.dto';
import UserRole from '../domain/user-role.entity';
import { TX } from '../../../common/types/prisma';

@Injectable()
export default class UserServiceImpl implements UserService {
  constructor(@Inject(UserRepositorySymbol) private readonly userRepository: UserRepository) {}

  async createUser(dto: SaveUserDto, tx?: TX): Promise<User> {
    const signUpChannelId = await this.userRepository.findUserSignUpChannelByName(dto.signUpChannel, tx);
    if (!signUpChannelId) {
      throw new NotFoundException('회원가입 경로를 찾을 수 없습니다.');
    }

    const userRole = await this.userRepository.findUserRoleByName(dto.role, tx);
    if (!userRole) {
      throw new NotFoundException('사용자 권한수준을 찾을 수 없습니다.');
    }

    const user = new User({
      email: dto.email,
      password: dto.password,
      nickname: dto.nickname,
      signUpChannelId: signUpChannelId.id,
      roleId: userRole.id,
      createUser: SYSTEM_USER_ID,
      updateUser: SYSTEM_USER_ID,
      // TODO: 프로필 이미지 기본값 바꾸기
      profile: dto.profile || 'https://via.placeholder.com/50x50',
    });

    const createdUser = await this.userRepository.saveUser(user, tx);
    const updatedUser = await this.userRepository.updateUser(
      createdUser.id,
      {
        createUser: createdUser.id,
        updateUser: createdUser.id,
      },
      tx,
    );

    return updatedUser;
  }

  async updateUser(userId: string, dto: UpdateUserDto): Promise<User> {
    const existUser = await this.userRepository.findUserById(userId);
    if (!existUser) {
      // TODO: 에러처리
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const updatedUser = await this.userRepository.updateUser(userId, dto);
    return updatedUser;
  }

  async findById(userId: string): Promise<User | null> {
    const user = await this.userRepository.findUserById(userId);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findUserByEmail(email);
    return user;
  }

  async findByNickname(nickname: string): Promise<User> {
    const user = await this.userRepository.findUserByNickname(nickname);
    return user;
  }

  async findUserRoleById(roleId: number): Promise<UserRole | null> {
    const userRole = this.userRepository.findUserRoleById(roleId);
    return userRole;
  }
}
