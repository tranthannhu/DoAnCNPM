import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserSigned = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.userSigned;
    return data ? user && user[data] : user;
  },
);
