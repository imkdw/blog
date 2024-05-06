import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { IMyJwtService, MyJwtServiceKey } from '../interfaces/my-jwt.interface';
import { UserRoleNotFoundException } from '../../../common/exceptions/404';
import { IRequester } from '../../../common/interfaces/common.interface';
import UserService from '../../user/service/user.service';
import UserRoleService from '../../user/service/user-role.service';

@Injectable()
export default class JwtGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(MyJwtServiceKey) private readonly myJwtService: IMyJwtService,
    private readonly userService: UserService,
    private readonly userRoleService: UserRoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    /**
     * 퍼블릭 API의 경우에는 토큰이 없어도 통과된다
     * 퍼블릭 API가 아닌 경우에는 토큰이 없으면 UnauthorizedException이 발생
     */
    if (!token) {
      if (isPublic) return true;
      throw new UnauthorizedException();
    }

    try {
      const payload = this.myJwtService.verify(token);

      const user = await this.userService.findById(payload.userId);
      if (!user) throw new UnauthorizedException();

      const userRole = await this.userRoleService.findById(user.roleId);
      if (!userRole) throw new UserRoleNotFoundException();

      const requester: IRequester = { userId: user.id, role: userRole.name };
      request.user = requester;
      return true;
    } catch {
      /**
       * JWT 토큰 파싱 혹은 유저 정보 조회시 퍼블릭 API의 경우에는 통과된다.
       * 퍼블릭 API가 아닌 경우에는 UnauthorizedException이 발생
       */
      if (isPublic) return true;
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
