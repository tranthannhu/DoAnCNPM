import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as _ from 'lodash';
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const module = this._reflector.get<string[]>('modules', context.getClass());
    const method = this._reflector.get<string[]>(
      'methods',
      context.getHandler(),
    );
    let scopePermission = null;
    const { permission } = req.user;
    const action = `${_.toUpper(method[0])}_${_.toUpper(module[0])}`;

    permission.forEach(permiss => {
      const splitPermission = _.split(permiss, '_');
      const joinPermission = _.join(
        [splitPermission[1], splitPermission[3]],
        '_',
      );
      if (action === joinPermission) {
        scopePermission = permiss;
      }
    });

    req.scopePermission = scopePermission;

    return _.includes(req.user.permission, scopePermission);
  }
}
