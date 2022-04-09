import { Req, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// export function AuthorizedMiddleware(
//   @Req() req: Request,
//   res: Response,
//   next: Function,
// ) {
//   console.log('Request');
//   //   throw new UnauthorizedException('Fobbiden Resource');
//   next();
// }
@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  use(@Req() req: Request, res: Response, next: NextFunction) {
    // console.log('req', req);
    // next();
  }
}
