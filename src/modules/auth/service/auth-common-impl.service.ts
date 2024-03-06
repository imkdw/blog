import { Inject, Injectable } from '@nestjs/common';
import { AuthCommonService } from '../types/service/auth-common.service';
import { UserService, UserServiceSymbol } from '../../user/types/service/user.service';
import { MyJwtService, MyJwtServiceSymbol } from '../types/service/my-jwt.service';
import { BcryptService, BcryptServiceSymbol } from '../types/service/bcrypt.service';
import { UserRoles, UserSignUpChannels } from '../../user/domain/user.entity';
import { CommonSignInDto } from '../types/dto/internal/sign-in.dto';
import { CommonSignUpDto } from '../types/dto/internal/sign-up.dto';
import { ExistEmailException, ExistNicknameException } from '../../../common/exceptions/409';
import { UserRoleService, UserRoleServiceSymbol } from '../../user/types/service/user-role.service';
import { UserRoleNotFoundException, UserSignupChannelNotFoundException } from '../../../common/exceptions/404';
import {
  UserSignupChannelService,
  UserSignupChannelServiceSymbol,
} from '../../user/types/service/user-signup-channel.service';
import { AuthMapper, AuthMapperSymbol } from '../types/mapper/auth.mapper';
import { AuthResult } from '../types/dto/internal/auth-result.dto';
import { InvalidCredentialsException } from '../../../common/exceptions/401';

@Injectable()
export default class AuthCommonServiceImpl implements AuthCommonService {
  constructor(
    @Inject(UserServiceSymbol) private readonly userService: UserService,
    @Inject(UserRoleServiceSymbol) private readonly userRoleService: UserRoleService,
    @Inject(UserSignupChannelServiceSymbol) private readonly userSignupChannelService: UserSignupChannelService,
    @Inject(MyJwtServiceSymbol) private readonly myJwtService: MyJwtService,
    @Inject(BcryptServiceSymbol) private readonly bcryptService: BcryptService,
    @Inject(AuthMapperSymbol) private readonly authMapper: AuthMapper,
  ) {}

  async commonSignUp(dto: CommonSignUpDto): Promise<AuthResult> {
    const { email, nickname, password } = dto;

    // 중복된 이메일 예외처리
    const userByEmail = await this.userService.findByEmail(email);
    if (userByEmail) throw new ExistEmailException(email);

    // 중복된 닉네임 예외처리
    const userByNickname = await this.userService.findByNickname(dto.nickname);
    if (userByNickname) throw new ExistNicknameException(nickname);

    /**
     * 사용자 권한정보 조회
     * 회원가입시 권한은 일반 유저로 가입된다
     */
    const userRole = await this.userRoleService.findByName(UserRoles.NORMAL, { includeDeleted: false });
    if (!userRole) throw new UserRoleNotFoundException(UserRoles.NORMAL);

    // 회원가입 경로 예외처리
    const signUpChannel = await this.userSignupChannelService.findByName(UserSignUpChannels.COMMON, {
      includeDeleted: false,
    });
    if (!signUpChannel) throw new UserSignupChannelNotFoundException(UserSignUpChannels.COMMON);

    // 비밀번호 암호화
    const hashedPassword = await this.bcryptService.toHash(password);

    // 유저 생성
    const createdUser = await this.userService.createUser({
      email: dto.email,
      nickname: dto.nickname,
      password: hashedPassword,
      roleId: userRole.id,
      signUpChannelId: signUpChannel.id,
    });

    const accessToken = this.myJwtService.createToken({
      userId: createdUser.id,
      role: userRole.name,
      tokenType: 'access',
    });

    const refreshToken = this.myJwtService.createToken({
      userId: createdUser.id,
      role: userRole.name,
      tokenType: 'refresh',
    });

    return this.authMapper.toAuthResult(accessToken, refreshToken, createdUser, userRole);
  }

  async commonSignIn(dto: CommonSignInDto): Promise<AuthResult> {
    const existUser = await this.userService.findByEmail(dto.email);
    if (!existUser) throw new InvalidCredentialsException(dto.email);

    const isMatchPassword = await this.bcryptService.compare(dto.password, existUser.password);
    if (!isMatchPassword) throw new InvalidCredentialsException();

    const userRole = await this.userRoleService.findById(existUser.roleId, { includeDeleted: false });
    if (!userRole) throw new UserRoleNotFoundException(existUser.roleId.toString());

    const accessToken = this.myJwtService.createToken({
      userId: existUser.id,
      role: userRole.name,
      tokenType: 'access',
    });

    const refreshToken = this.myJwtService.createToken({
      userId: existUser.id,
      role: userRole.name,
      tokenType: 'refresh',
    });

    return this.authMapper.toAuthResult(accessToken, refreshToken, existUser, userRole);
  }
}
