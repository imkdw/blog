import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { IUserRepository, IUserService, UserRepositoryKey } from '../interfaces/user.interface';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import { CreateUserDto } from '../dto/internal/create-user.dto';
import { ExistEmailException, ExistNicknameException } from '../../../common/exceptions/409';
import SignupUser from '../domain/models/signup-user.model';
import {
  BcryptConfig,
  IMyConfigService,
  MyConfigServiceKey,
} from '../../../infra/config/interfaces/my-config.interface';
import User from '../domain/entities/user.entity';
import { MyConfig } from '../../../infra/config/enums/my-config.enum';
import { TX } from '../../../common/types/prisma';
import { UpdateUserDto } from '../dto/internal/update-user.dto';
import { SYSTEM_USER_ID } from '../../../common/constants/system.constant';

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
    const { email, nickname, oAuthProviderId, password, roleId, signupChannelId } = dto;

    const [userByEmail, userByNickname] = await Promise.all([
      this.findByEmail(email, { includeDeleted: true }),
      this.findByNickname(nickname, { includeDeleted: true }),
    ]);

    if (userByEmail) throw new ExistEmailException(email);
    if (userByNickname) throw new ExistNicknameException(nickname);

    // TODO: 기본 프로필사진 변경하기
    const registeringUser = new SignupUser(
      email,
      password,
      nickname,
      'https://cdn-icons-png.flaticon.com/512/3106/3106773.png',
      roleId,
      signupChannelId,
      oAuthProviderId,
      SYSTEM_USER_ID,
      SYSTEM_USER_ID,
    );

    await registeringUser.hashPassword(this.bcryptConfig.salt);
    const createdUser = await this.userRepository.save(registeringUser, tx);

    return createdUser;
  }

  async update(userId: string, dto: UpdateUserDto, tx?: TX): Promise<void> {
    await this.userRepository.update(userId, dto, tx);
  }

  async findByEmail(email: string, option: FindOption): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email, option);
    return user;
  }

  async findByNickname(nickname: string, option: FindOption): Promise<User | null> {
    const user = await this.userRepository.findByNickname(nickname, option);
    return user;
  }

  async findById(id: string, option: FindOption): Promise<User | null> {
    const user = await this.userRepository.findById(id, option);
    return user;
  }
}
