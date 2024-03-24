import { Inject, Injectable } from '@nestjs/common';
import { IUserMapper, IUserRepository, UserMapperKey } from '../interfaces/user.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import User from '../domain/entities/user.entity';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import SignupUser from '../domain/models/signup-user.model';
import { TX } from '../../../common/types/prisma';

@Injectable()
export default class UserRepository implements IUserRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(UserMapperKey) private readonly userMapper: IUserMapper,
  ) {}

  async save(user: SignupUser, tx: TX): Promise<User> {
    const createdUser = await tx.users.create({ data: user });
    return this.userMapper.toUser(createdUser);
  }

  async update(userId: string, user: Partial<User>, tx: TX): Promise<void> {
    await tx.users.update({ where: { id: userId }, data: user });
  }

  async findByEmail(email: string, option: FindOption): Promise<User | null> {
    const user = await this.prisma.users.findUnique({
      where: { email, ...(!option.includeDeleted && { deleteAt: null }) },
    });
    return user;
  }

  async findByEmailAndProviderId(email: string, providerId: number, option: FindOption): Promise<User | null> {
    const user = await this.prisma.users.findFirst({
      where: { email, oAuthProviderId: providerId, ...(!option.includeDeleted && { deleteAt: null }) },
    });
    return user;
  }

  async findById(id: string, option: FindOption): Promise<User | null> {
    const user = await this.prisma.users.findUnique({
      where: { id, ...(!option.includeDeleted && { deleteAt: null }) },
    });
    return user;
  }

  async findByNickname(nickname: string, option: FindOption): Promise<User | null> {
    const user = await this.prisma.users.findUnique({
      where: { nickname, ...(!option.includeDeleted && { deleteAt: null }) },
    });
    return user;
  }
}
