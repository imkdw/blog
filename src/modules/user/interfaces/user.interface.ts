import { FindOption } from '../../../common/interfaces/find-option.interface';
import { CreateUserDto } from '../dto/internal/create-user.dto';
import { TX } from '../../../common/types/prisma';
import { UpdateUserDto } from '../dto/internal/update-user.dto';
import User from '../entities/user.entity';
import UserCreateEntity from '../entities/user-create.entity';
import { CheckDuplicateType } from '../enums/user.enum';

export const UserServiceKey = Symbol('UserService');
export interface IUserService {
  onModuleInit(): Promise<void>;
  create(dto: CreateUserDto, tx?: TX): Promise<User>;
  update(userId: string, dto: UpdateUserDto, tx?: TX): Promise<void>;
  checkDuplicate(type: CheckDuplicateType, value: string): Promise<boolean>;
  findById(id: string, option?: FindOption): Promise<User | null>;
  findByEmail(email: string, option?: FindOption): Promise<User | null>;
  findByNickname(nickname: string, option?: FindOption): Promise<User | null>;
}

export const UserRepositoryKey = Symbol('UserRepository');
export interface IUserRepository {
  save(user: UserCreateEntity, tx: TX): Promise<User>;
  update(userId: string, user: Partial<User>, tx: TX): Promise<void>;
  findById(id: string, option?: FindOption): Promise<User | null>;
  findByEmail(email: string, option?: FindOption): Promise<User | null>;
  findByNickname(nickname: string, option?: FindOption): Promise<User | null>;
}
