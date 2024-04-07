import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IUserRoles, UserRoles } from '../../user/domain/entities/user-role.entity';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export default class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<IUserRoles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (user.role !== UserRoles.ADMIN) {
      throw new ForbiddenException();
    }

    return user.role === UserRoles.ADMIN;
  }
}
