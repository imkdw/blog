import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const Requester = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});

export default Requester;
