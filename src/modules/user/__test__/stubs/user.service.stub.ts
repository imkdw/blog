/* eslint-disable @typescript-eslint/no-unused-vars */
import { FindOption } from '../../../../common/interfaces/find-option.interface';
import { TX } from '../../../../common/types/prisma';
import createUUID from '../../../../common/utils/uuid';
import { USER_DEFAULT_PROFILE } from '../../constants/user.constant';
import { CreateUserDto } from '../../dto/internal/create-user.dto';
import { UpdateUserDto } from '../../dto/internal/update-user.dto';
import User from '../../entities/user.entity';
import { CheckDuplicateType } from '../../enums/user.enum';
import { IUserService } from '../../interfaces/user.interface';

export default class UserServiceStub implements IUserService {
  private memory: User[] = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async onModuleInit(): Promise<void> {}

  async checkDuplicate(type: CheckDuplicateType, value: string): Promise<boolean> {
    let user: User | null = null;

    if (type === CheckDuplicateType.EMAIL) {
      user = await this.findByEmail(value, { includeDeleted: true });
    } else if (type === CheckDuplicateType.NICKNAME) {
      user = await this.findByNickname(value, { includeDeleted: true });
    }

    return !!user;
  }

  async create(dto: CreateUserDto, tx?: TX): Promise<User> {
    const user = new User({
      id: createUUID(),
      email: dto.email,
      nickname: dto.nickname,
      password: dto.password,
      roleId: dto.roleId,
      profile: USER_DEFAULT_PROFILE,
      signupChannelId: dto.signupChannelId,
      oAuthProviderId: dto.oAuthProviderId,
    });

    this.memory.push(user);

    return user;
  }

  async findByEmail(email: string, option?: FindOption): Promise<User | null> {
    const user = this.memory.find((item) => item.email === email);
    if (!user) return null;
    if (option?.includeDeleted && user?.deleteAt) return null;

    return user;
  }

  async findById(id: string, option?: FindOption): Promise<User | null> {
    const user = this.memory.find((item) => item.id === id);
    if (!user) return null;
    if (option?.includeDeleted && user?.deleteAt) return null;

    return user;
  }

  async findByNickname(nickname: string, option?: FindOption): Promise<User | null> {
    const user = this.memory.find((item) => item.nickname === nickname);
    if (!user) return null;
    if (option?.includeDeleted && user?.deleteAt) return null;

    return user;
  }

  async update(userId: string, dto: UpdateUserDto, tx?: TX): Promise<void> {
    const index = this.memory.findIndex((item) => item.id === userId);
    if (index === -1) return;

    this.memory[index] = { ...this.memory[index], ...dto } as User;
  }

  reset() {
    this.memory = [];
  }
}
