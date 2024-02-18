import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUserRoles } from '../../modules/user/domain/user.entity';

const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});

export interface IUser {
  userId: string;
  role: IUserRoles;
}

export default User;
