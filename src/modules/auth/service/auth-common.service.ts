import { Inject, Injectable } from '@nestjs/common';
import { IAuthCommonService } from '../interfaces/auth-common.interface';
import { SigninDto } from '../dto/internal/auth-common.dto';
import { IUserService, UserServiceKey } from '../../user/interfaces/user.interface';
import { IUserRoleService, UserRoleServiceKey } from '../../user/interfaces/user-role.interface';
import { UserRoleNotFoundException, UserSignupChannelNotFoundException } from '../../../common/exceptions/404';
import {
  IUserSignupChannelService,
  UserSignupChannelServiceKey,
} from '../../user/interfaces/user-signup-channel.interface';
import { AuthResult } from '../dto/internal/auth-result.dto';
import { IMyJwtService, MyJwtServiceKey } from '../interfaces/my-jwt.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { InvalidCredentialException, OAuthUserSinginWithCommonException } from '../../../common/exceptions/401';
import { toAuthResult } from '../mapper/auth.mapper';
import { UserSignupChannels } from '../../user/enums/user-signup-channel.enum';
import SigninUser from '../../user/domain/user/signin';

@Injectable()
export default class AuthCommonService implements IAuthCommonService {
  constructor(
    @Inject(UserServiceKey) private readonly userService: IUserService,
    @Inject(UserRoleServiceKey) private readonly userRoleService: IUserRoleService,
    @Inject(UserSignupChannelServiceKey) private readonly userSignupChannelService: IUserSignupChannelService,
    @Inject(MyJwtServiceKey) private readonly myJwtService: IMyJwtService,
    private readonly prisma: PrismaService,
  ) {}

  async signin(dto: SigninDto): Promise<AuthResult> {
    const { email, password } = dto;

    const existUser = await this.userService.findOne({ email }, { includeDeleted: false });
    if (!existUser) throw new InvalidCredentialException();

    const signupChannel = await this.userSignupChannelService.findOne(
      { id: existUser.signupChannelId },
      { includeDeleted: false },
    );
    if (!signupChannel) throw new UserSignupChannelNotFoundException(existUser.signupChannelId.toString());
    if (signupChannel.name !== UserSignupChannels.COMMON) throw new OAuthUserSinginWithCommonException(existUser.id);

    const userRole = await this.userRoleService.findOne({ id: existUser.roleId }, { includeDeleted: false });
    if (!userRole) throw new UserRoleNotFoundException(existUser.roleId.toString());

    const signinUser = new SigninUser(existUser.email, existUser.password);
    await signinUser.comparePassword(password);

    const [accessToken, refreshToken] = [
      this.myJwtService.createToken('access', existUser.id),
      this.myJwtService.createToken('refresh', existUser.id),
    ];

    return toAuthResult(existUser, userRole, accessToken, refreshToken);
  }
}
