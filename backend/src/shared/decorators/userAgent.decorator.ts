import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const userAgent = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers['user-agent'];
  },
);