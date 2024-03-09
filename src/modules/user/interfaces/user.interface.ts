import { users } from '@prisma/client';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import User from '../domain/entities/user.entity';
import RegisteringUser from '../domain/models/registering-user.model';
import { CreateUserDto } from '../dto/internal/create-user.dto';
import { TX } from '../../../common/types/prisma';
import { UpdateUserDto } from '../dto/internal/update-user.dto';

export const UserServiceKey = Symbol('UserService');
export interface IUserService {
  create(dto: CreateUserDto, tx: TX): Promise<User>;

  update(userId: string, dto: UpdateUserDto, tx?: TX): Promise<void>;

  findByEmail(email: string, option: FindOption): Promise<User | null>;

  findById(id: string, option: FindOption): Promise<User | null>;

  findByNickname(nickname: string, option: FindOption): Promise<User | null>;
}

export const UserRepositoryKey = Symbol('UserRepository');
export interface IUserRepository {
  save(user: RegisteringUser, tx: TX): Promise<User>;

  update(userId: string, user: Partial<User>, tx: TX): Promise<void>;

  findByEmail(email: string, option: FindOption): Promise<User | null>;

  findById(id: string, option: FindOption): Promise<User | null>;

  findByNickname(nickname: string, option: FindOption): Promise<User | null>;
}

export const UserMapperKey = Symbol('UserMapper');
export interface IUserMapper {
  toUser(user: users): User;
}
