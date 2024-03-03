import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

import { MyJwtService, MyJwtServiceSymbol } from '../types/service/my-jwt.service';
import { IS_PUBLIC_KEY } from '../../../common/decorators/public.decorator';
import { UserService, UserServiceSymbol } from '../../user/types/service/user.service';
import { IUser } from '../../../common/decorators/user.decorator';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(
    @Inject(MyJwtServiceSymbol) private readonly jwtService: MyJwtService,
    @Inject(UserServiceSymbol) private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      // TODO: 에러 처리
      throw new UnauthorizedException('올바르지 않은 토큰입니다.');
    }

    try {
      const payload = this.jwtService.verify(token);

      const user = await this.userService.findById(payload.userId);
      if (!user) {
        // TODO: 에러처리
        throw new NotFoundException('사용자를 찾을 수 없습니다.');
      }

      const userRole = await this.userService.findUserRoleById(user.roleId);
      if (!userRole) {
        // TODO: 에러처리
        throw new NotFoundException('사용자의 권한을 찾을 수 없습니다.');
      }

      Object.assign(request, {
        user: {
          userId: user.id,
          role: userRole.name,
        } as IUser,
      });
    } catch (err) {
      // TODO: 에러처리
      Logger.error(err);
      throw new UnauthorizedException('토큰이 만료되었습니다.');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
