import { Inject, Injectable } from '@nestjs/common';
import { AuthCommonService } from '../types/auth-common.service';
import SignUpDto from '../types/dto/internal/sign-up.dto';
import { UserService, UserServiceSymbol } from '../../user/types/user.service';

@Injectable()
export default class AuthCommonServiceImpl implements AuthCommonService {
  constructor(@Inject(UserServiceSymbol) private readonly userService: UserService) {}

  commonSignUp(dto: SignUpDto): void {
    this.userService.saveUser(dto);
  }
}
