import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AuthCommonService } from '../types/auth-common.service';
import { UserService, UserServiceSymbol } from '../../user/types/user.service';
import { MyJwtService, MyJwtServiceSymbol } from '../types/my-jwt.service';
import { CommonSignUpDto, CommonSignUpResult } from '../types/dto/internal/sign-up.dto';
import { CommonSignInDto, CommonSignInResult } from '../types/dto/internal/sign-in.dto';
import { BcryptService, BcryptServiceSymbol } from '../types/bcrypt.service';

@Injectable()
export default class AuthCommonServiceImpl implements AuthCommonService {
  constructor(
    @Inject(UserServiceSymbol) private readonly userService: UserService,
    @Inject(MyJwtServiceSymbol) private readonly myJwtService: MyJwtService,
    @Inject(BcryptServiceSymbol) private readonly bcryptService: BcryptService,
  ) {}

  async commonSignUp(dto: CommonSignUpDto): Promise<CommonSignUpResult> {
    const hashedPassword = await this.bcryptService.toHash(dto.password);
    this.userService.saveUser({ email: dto.email, nickname: dto.nickname, password: hashedPassword });

    const accessToken = this.myJwtService.createToken({ email: dto.email, tokenType: 'access' });
    const refreshToken = this.myJwtService.createToken({ email: dto.email, tokenType: 'refresh' });

    return { email: dto.email, accessToken, refreshToken };
  }

  async commonSignIn(dto: CommonSignInDto): Promise<CommonSignInResult> {
    const existUser = this.userService.findUserByEmail(dto.email);
    if (!existUser) {
      // TODO: 사용자 없음 예외 처리
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }

    const isMatchPassword = await this.bcryptService.compare(dto.password, existUser.password);
    if (!isMatchPassword) {
      // TODO: 비밀번호 불일치 에러
      throw new ForbiddenException('비밀번호가 일치하지 않습니다.');
    }

    const accessToken = this.myJwtService.createToken({ email: dto.email, tokenType: 'access' });
    const refreshToken = this.myJwtService.createToken({ email: dto.email, tokenType: 'refresh' });

    return { email: dto.email, accessToken, refreshToken };
  }
}
