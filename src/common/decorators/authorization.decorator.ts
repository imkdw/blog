import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const Authorization = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.headers.authorization?.replace('Bearer ', '');
});

export default Authorization;
