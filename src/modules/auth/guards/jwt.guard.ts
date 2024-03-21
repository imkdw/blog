import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { IMyJwtService, MyJwtServiceKey } from '../interfaces/my-jwt.interface';
import { IUserService, UserServiceKey } from '../../user/interfaces/user.interface';
import { IUserRoleService, UserRoleServiceKey } from '../../user/interfaces/user-role.interface';
import { UserRoleNotFoundException } from '../../../common/exceptions/404';
import { IRequester } from '../../../common/interfaces/common.interface';

@Injectable()
export default class JwtGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(MyJwtServiceKey) private readonly myJwtService: IMyJwtService,
    @Inject(UserServiceKey) private readonly userService: IUserService,
    @Inject(UserRoleServiceKey) private readonly userRoleService: IUserRoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // PUBLIC으로 설정된 API는 인증을 거치지 않음
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();

    // 인증이 필요한 API에 토큰이 없는 경우
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();

    const payload = this.myJwtService.verify(token);

    const user = await this.userService.findById(payload.userId, { includeDeleted: false });
    if (!user) throw new UnauthorizedException();

    const userRole = await this.userRoleService.findById(user.roleId, { includeDeleted: false });
    if (!userRole) throw new UserRoleNotFoundException();

    const requester: IRequester = { userId: user.id, role: userRole.name };
    request.user = requester;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
