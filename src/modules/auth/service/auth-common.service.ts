import { Inject, Injectable } from '@nestjs/common';
import { IAuthCommonService } from '../interfaces/auth-common.interface';
import { SignupDto } from '../dto/internal/auth-common.dto';
import { IUserService, UserServiceKey } from '../../user/interfaces/user.interface';
import { IUserRoleService, UserRoleServiceKey } from '../../user/interfaces/user-role.interface';
import { UserRoleNotFoundException, UserSignupChannelNotFoundException } from '../../../common/exceptions/404';
import { UserRoles } from '../../user/domain/entities/user-role.entity';
import {
  IUserSignupChannelService,
  UserSignupChannelServiceKey,
} from '../../user/interfaces/user-signup-channel.interface';
import { UserSignupChannels } from '../../user/domain/entities/user-signup-channel.entity';
import { AuthResult } from '../dto/internal/auth-result.dto';
import { IMyJwtService, MyJwtServiceKey } from '../interfaces/my-jwt.interface';
import { AuthMapperKey, IAuthMapper } from '../interfaces/auth.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';

@Injectable()
export default class AuthCommonService implements IAuthCommonService {
  constructor(
    @Inject(UserServiceKey) private readonly userService: IUserService,
    @Inject(UserRoleServiceKey) private readonly userRoleService: IUserRoleService,
    @Inject(UserSignupChannelServiceKey) private readonly userSignupChannelService: IUserSignupChannelService,
    @Inject(MyJwtServiceKey) private readonly myJwtService: IMyJwtService,
    @Inject(AuthMapperKey) private readonly authMapper: IAuthMapper,
    private readonly prisma: PrismaService,
  ) {}

  async signup(dto: SignupDto): Promise<AuthResult> {
    const { email, nickname, password } = dto;
    const [userRole, userSignupChannel] = await Promise.all([
      this.userRoleService.findByName(UserRoles.NORMAL, { includeDeleted: true }),
      this.userSignupChannelService.findByName(UserSignupChannels.COMMON, { includeDeleted: true }),
    ]);

    if (!userRole) throw new UserRoleNotFoundException(UserRoles.NORMAL);
    if (!userSignupChannel) throw new UserSignupChannelNotFoundException();

    const signedUser = await this.prisma.$transaction(async (tx) => {
      const createdUser = await this.userService.create(
        {
          email,
          nickname,
          password,
          roleId: userRole.id,
          signupChannelId: userSignupChannel.id,
          oAuthProviderId: null,
        },
        tx,
      );

      await this.userService.update(createdUser.id, { createUser: createdUser.id, updateUser: createdUser.id }, tx);

      return createdUser;
    });

    const [accessToken, refreshToken] = [
      this.myJwtService.createToken('access', signedUser.id),
      this.myJwtService.createToken('refresh', signedUser.id),
    ];

    return this.authMapper.toAuthResult(signedUser, userRole, accessToken, refreshToken);
  }
}
