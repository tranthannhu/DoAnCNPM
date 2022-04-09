import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import jwt = require('jsonwebtoken')

export const UserSession = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user && user[data] : user;
  },
);

export const UserDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // console.log(request);
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      return decoded;
    }
    catch (err) {
      return undefined;
    }
  }
)

