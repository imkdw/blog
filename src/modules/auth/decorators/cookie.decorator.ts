import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

const Cookie = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<Request>();
  return req.headers.cookie;
});

export default Cookie;
