import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { getManager, Connection } from 'typeorm';
import { Category } from 'src/entity/category.entity';
import * as _ from 'lodash';
import { methodEnum } from 'src/common/enums/method.enum';
// import {} from ''
@Injectable()
export class PossessionGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const props = Object.getOwnPropertyNames(req.params);
    const manager = getManager();
    const tableName = this._reflector.get<string[]>(
      'entity',
      context.getClass(),
    );
    const method = this._reflector.get<string[]>(
      'methods',
      context.getHandler(),
    );

    if (method[0] == methodEnum.CREATE || method[0] == methodEnum.READ) {
      return true;
    }

    const data = await manager.query(
      `SELECT * FROM ${tableName[0]} WHERE ${props} = '${
        req.params[props[0]]
      }'`,
    );

    const { scopePermission } = req;
    console.log('data', data);
    console.log('table', tableName[0]);
    if (data.length == 0) {
      return false;
    }
    console.log('user', data[0].userId);
    console.log('req', req);

    if (scopePermission.search(/any/i) < 0 && data.length > 0) {
      return data[0].userId === req.user.users.id;
    }

    return true;
  }
}
