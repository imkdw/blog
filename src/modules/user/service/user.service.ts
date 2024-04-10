import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { IUserRepository, IUserService, UserRepositoryKey } from '../interfaces/user.interface';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import { CreateUserDto } from '../dto/internal/create-user.dto';
import { ExistEmailException, ExistNicknameException } from '../../../common/exceptions/409';
import {
  BcryptConfig,
  IMyConfigService,
  MyConfigServiceKey,
} from '../../../infra/config/interfaces/my-config.interface';
import User from '../domain/user/user.domain';
import { MyConfig } from '../../../infra/config/enums/my-config.enum';
import { TX } from '../../../common/types/prisma';
import { UpdateUserDto } from '../dto/internal/update-user.dto';
import { CheckDuplicateType, ICheckDuplicateType } from '../enums/user.enum';
import SignupUser from '../domain/user/singup';

@Injectable()
export default class UserService implements IUserService, OnModuleInit {
  private bcryptConfig: BcryptConfig;

  constructor(
    @Inject(UserRepositoryKey) private readonly userRepository: IUserRepository,
    @Inject(MyConfigServiceKey) private readonly MyConfigService: IMyConfigService,
  ) {}

  async onModuleInit() {
    this.bcryptConfig = await this.MyConfigService.getConfig(MyConfig.BCRYPT);
  }

  async create(dto: CreateUserDto, tx: TX): Promise<User> {
    const [userByEmail, userByNickname] = await Promise.all([
      this.findOne({ email: dto.email }, { includeDeleted: true }),
      this.findOne({ nickname: dto.nickname }, { includeDeleted: true }),
    ]);

    if (userByEmail) throw new ExistEmailException(dto.email);
    if (userByNickname) throw new ExistNicknameException(dto.nickname);

    const registeringUser = await new SignupUser(dto).hashPassword(this.bcryptConfig.salt);

    const createdUser = await this.userRepository.save(registeringUser, tx);

    return createdUser;
  }

  async update(userId: string, dto: UpdateUserDto, tx?: TX): Promise<void> {
    await this.userRepository.update(userId, dto, tx);
  }

  async checkDuplicate(type: ICheckDuplicateType, value: string): Promise<boolean> {
    let user: User | null = null;

    if (type === CheckDuplicateType.EMAIL) {
      user = await this.findOne({ email: value }, { includeDeleted: true });
    } else if (type === CheckDuplicateType.NICKNAME) {
      user = await this.findOne({ nickname: value }, { includeDeleted: true });
    }

    return !!user;
  }

  async findOne(dto: Partial<User>, option: FindOption): Promise<User | null> {
    const user = await this.userRepository.findOne(dto, option);
    return user;
  }
}
