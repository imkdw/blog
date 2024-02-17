import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});

export default User;
