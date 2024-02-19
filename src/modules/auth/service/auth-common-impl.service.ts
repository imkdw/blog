import { ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AuthCommonService } from '../types/service/auth-common.service';
import { UserService, UserServiceSymbol } from '../../user/types/service/user.service';
import { MyJwtService, MyJwtServiceSymbol } from '../types/service/my-jwt.service';
import { CommonSignUpDto, CommonSignUpResult } from '../types/dto/internal/sign-up.dto';
import { CommonSignInDto, CommonSignInResult } from '../types/dto/internal/sign-in.dto';
import { BcryptService, BcryptServiceSymbol } from '../types/service/bcrypt.service';
import { UserRoles, UserSignUpChannels } from '../../user/domain/user.entity';

@Injectable()
export default class AuthCommonServiceImpl implements AuthCommonService {
  constructor(
    @Inject(UserServiceSymbol) private readonly userService: UserService,
    @Inject(MyJwtServiceSymbol) private readonly myJwtService: MyJwtService,
    @Inject(BcryptServiceSymbol) private readonly bcryptService: BcryptService,
  ) {}

  async commonSignUp(dto: CommonSignUpDto): Promise<CommonSignUpResult> {
    const userByEmail = await this.userService.findByEmail(dto.email);

    if (userByEmail) {
      // TODO: 에러처리
      throw new ConflictException('이미 가입된 이메일입니다.');
    }

    const userByNickname = await this.userService.findByNickname(dto.nickname);
    if (userByNickname) {
      // TODO: 에러처리
      throw new ConflictException('이미 사용중인 닉네임입니다.');
    }

    const hashedPassword = await this.bcryptService.toHash(dto.password);
    const createdUser = await this.userService.createUser({
      email: dto.email,
      nickname: dto.nickname,
      password: hashedPassword,
      role: UserRoles.NORMAL,
      signUpChannel: UserSignUpChannels.COMMON,
    });

    const userRole = await this.userService.findUserRoleById(createdUser.roleId);
    if (!userRole) {
      // TODO: 에러처리
      throw new NotFoundException('사용자 권한 정보를 찾을 수 없습니다.');
    }

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

    return { email: dto.email, accessToken, refreshToken };
  }

  async commonSignIn(dto: CommonSignInDto): Promise<CommonSignInResult> {
    const existUser = await this.userService.findByEmail(dto.email);

    if (!existUser) {
      // TODO: 사용자 없음 예외 처리
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }

    const isMatchPassword = await this.bcryptService.compare(dto.password, existUser.password);
    if (!isMatchPassword) {
      // TODO: 비밀번호 불일치 에러
      throw new ForbiddenException('비밀번호가 일치하지 않습니다.');
    }

    const userRole = await this.userService.findUserRoleById(existUser.roleId);
    if (!userRole) {
      // TODO: 에러처리
      throw new NotFoundException('사용자 권한 정보를 찾을 수 없습니다.');
    }

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

    return { email: dto.email, accessToken, refreshToken };
  }
}
