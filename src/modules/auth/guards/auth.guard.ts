import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

import { MyJwtService, MyJwtServiceSymbol } from '../types/my-jwt.service';
import { IS_PUBLIC_KEY } from '../../../common/decorators/public.decorator';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(
    @Inject(MyJwtServiceSymbol) private readonly jwtService: MyJwtService,
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
      Object.assign(request, { user: payload });
    } catch {
      // TODO: 에러처리
      throw new UnauthorizedException('토큰이 만료되었습니다.');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
