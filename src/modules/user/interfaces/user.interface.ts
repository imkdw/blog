import { FindOption } from '../../../common/interfaces/find-option.interface';
import User from '../domain/user/user.domain';
import { CreateUserDto } from '../dto/internal/create-user.dto';
import { TX } from '../../../common/types/prisma';
import { UpdateUserDto } from '../dto/internal/update-user.dto';
import { ICheckDuplicateType } from '../enums/user.enum';
import SignupUser from '../domain/user/singup';

export const UserServiceKey = Symbol('UserService');
export interface IUserService {
  create(dto: CreateUserDto, tx: TX): Promise<User>;

  update(userId: string, dto: UpdateUserDto, tx?: TX): Promise<void>;

  checkDuplicate(type: ICheckDuplicateType, value: string): Promise<boolean>;

  findOne(dto: Partial<User>, option: FindOption): Promise<User | null>;
}

export const UserRepositoryKey = Symbol('UserRepository');
export interface IUserRepository {
  save(user: SignupUser, tx: TX): Promise<User>;

  update(userId: string, user: Partial<User>, tx: TX): Promise<void>;

  findOne(dto: Partial<User>, option: FindOption): Promise<User | null>;
}
