import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AuthCommonService } from '../types/auth-common.service';
import { UserService, UserServiceSymbol } from '../../user/types/user.service';
import { MyJwtService, MyJwtServiceSymbol } from '../types/my-jwt.service';
import { CommonSignUpDto, CommonSignUpResult } from '../types/dto/internal/sign-up.dto';
import { CommonSignInDto, CommonSignInResult } from '../types/dto/internal/sign-in.dto';

@Injectable()
export default class AuthCommonServiceImpl implements AuthCommonService {
  constructor(
    @Inject(UserServiceSymbol) private readonly userService: UserService,
    @Inject(MyJwtServiceSymbol) private readonly myJwtService: MyJwtService,
  ) {}

  commonSignUp(dto: CommonSignUpDto): CommonSignUpResult {
    this.userService.saveUser(dto);

    const accessToken = this.myJwtService.createToken({ email: dto.email, tokenType: 'access' });
    const refreshToken = this.myJwtService.createToken({ email: dto.email, tokenType: 'refresh' });

    return { email: dto.email, accessToken, refreshToken };
  }

  commonSignIn(dto: CommonSignInDto): CommonSignInResult {
    const existUser = this.userService.findUserByEmail(dto.email);
    if (!existUser) {
      // TODO: 사용자 없음 예외 처리
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }

    if (existUser.password !== dto.password) {
      // TODO: 비밀번호 불일치 에러
      throw new ForbiddenException('비밀번호가 일치하지 않습니다.');
    }

    const accessToken = this.myJwtService.createToken({ email: dto.email, tokenType: 'access' });
    const refreshToken = this.myJwtService.createToken({ email: dto.email, tokenType: 'refresh' });

    return { email: dto.email, accessToken, refreshToken };
  }
}
