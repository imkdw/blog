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
import { MyConfig } from '../../../infra/config/enums/my-config.enum';
import { TX } from '../../../common/types/prisma';
import { UpdateUserDto } from '../dto/internal/update-user.dto';
import { CheckDuplicateType, ICheckDuplicateType } from '../enums/user.enum';
import UserEntity from '../entities/user.entity';
import { UserCreateEntityBuilder } from '../entities/user-create.entity';

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

  async create(dto: CreateUserDto, tx: TX): Promise<UserEntity> {
    const userByEmail = await this.findByEmail(dto.email, { includeDeleted: true });
    if (userByEmail) throw new ExistEmailException(dto.email);

    const userByNickname = await this.findByNickname(dto.nickname, { includeDeleted: true });
    if (userByNickname) throw new ExistNicknameException(dto.nickname);

    const userCreateEntity = new UserCreateEntityBuilder()
      .setEmail(dto.email)
      .setPassword(dto.password)
      .setNickname(dto.nickname)
      .setSignupChannelId(dto.signupChannelId)
      .setRoleId(dto.roleId)
      .setOAuthProviderId(dto.oAuthProviderId)
      .build();
    await userCreateEntity.hashPassword(this.bcryptConfig.salt);

    const createdUser = await this.userRepository.save(userCreateEntity, tx);

    return createdUser;
  }

  async update(userId: string, dto: UpdateUserDto, tx?: TX): Promise<void> {
    await this.userRepository.update(userId, dto, tx);
  }

  async checkDuplicate(type: ICheckDuplicateType, value: string): Promise<boolean> {
    let user: UserEntity | null = null;

    if (type === CheckDuplicateType.EMAIL) {
      user = await this.findByEmail(value, { includeDeleted: true });
    } else if (type === CheckDuplicateType.NICKNAME) {
      user = await this.findByNickname(value, { includeDeleted: true });
    }

    return !!user;
  }

  async findById(id: string, option?: FindOption): Promise<UserEntity | null> {
    const user = await this.userRepository.findById(id, option);
    return user;
  }

  async findByEmail(email: string, option?: FindOption): Promise<UserEntity | null> {
    const user = await this.userRepository.findByEmail(email, option);
    return user;
  }

  async findByNickname(nickname: string, option?: FindOption): Promise<UserEntity | null> {
    const user = await this.userRepository.findByNickname(nickname, option);
    return user;
  }
}
