import { userRole, userSignupChannel, users } from '@prisma/client';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import User from '../domain/entities/user.entity';
import SignupUser from '../domain/models/signup-user.model';
import { CreateUserDto } from '../dto/internal/create-user.dto';
import { TX } from '../../../common/types/prisma';
import { UpdateUserDto } from '../dto/internal/update-user.dto';
import UserSignupChannel from '../domain/entities/user-signup-channel.entity';
import UserRole from '../domain/entities/user-role.entity';
import { ICheckDuplicateType } from '../enums/user.enum';

export const UserServiceKey = Symbol('UserService');
export interface IUserService {
  create(dto: CreateUserDto, tx: TX): Promise<User>;

  update(userId: string, dto: UpdateUserDto, tx?: TX): Promise<void>;

  checkDuplicate(type: ICheckDuplicateType, value: string): Promise<boolean>;

  findByEmail(email: string, option: FindOption): Promise<User | null>;

  findById(id: string, option: FindOption): Promise<User | null>;

  findByNickname(nickname: string, option: FindOption): Promise<User | null>;
}

export const UserRepositoryKey = Symbol('UserRepository');
export interface IUserRepository {
  save(user: SignupUser, tx: TX): Promise<User>;

  update(userId: string, user: Partial<User>, tx: TX): Promise<void>;

  findByEmail(email: string, option: FindOption): Promise<User | null>;

  findById(id: string, option: FindOption): Promise<User | null>;

  findByNickname(nickname: string, option: FindOption): Promise<User | null>;
}

export const UserMapperKey = Symbol('UserMapper');
export interface IUserMapper {
  toUser(user: users): User;

  toUserSignupChannel(_signupChannel: userSignupChannel): UserSignupChannel;

  toUserRole(_userRole: userRole): UserRole;
}
