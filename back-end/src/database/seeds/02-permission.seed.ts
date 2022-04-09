import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { PermissionsEntity } from '../../entity/permission.entity';
import { ModulesEntity } from '../../entity/module.entity';
import { MethodsEntity } from '../../entity/method.entity';
import { RolePermission } from '../../entity/role_permission.entity';

import { AppRoles } from '../../app.role';
import * as _ from 'lodash';
import { enumToArray } from '../../core/utils/helper';
import { Role } from '../../entity/role.entity';

export default class CreatePermissions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const moduleRepository = connection.getRepository(ModulesEntity);
    const methodRepository = connection.getRepository(MethodsEntity);
    const permissionRepository = connection.getRepository(PermissionsEntity);
    const rolePermissionRepository = connection.getRepository(RolePermission);
    const roleRepository = connection.getRepository(Role);
    // const modules = await moduleRepository.find();
    // const methods = await methodRepository.find();

    const appRole = enumToArray(AppRoles);

    for (let index = 0; index < appRole.length; index++) {
      const splitRolePermission = _.split(appRole[index], '_');

      const role = await roleRepository.findOne({
        where: { role: splitRolePermission[0] },
      });
      const module = await moduleRepository.findOne({
        where: { module: splitRolePermission[3] },
      });

      const method = await methodRepository.findOne({
        where: { method: splitRolePermission[1] },
      });

      if (!role) {
        await connection
          .createQueryBuilder()
          .insert()
          .into(Role)
          .values([
            {
              role: splitRolePermission[0],
            },
          ])
          .execute();
      }
      if (!module) {
        await connection
          .createQueryBuilder()
          .insert()
          .into(ModulesEntity)
          .values([
            {
              module: splitRolePermission[3],
            },
          ])
          .execute();
      }

      if (!method) {
        await connection
          .createQueryBuilder()
          .insert()
          .into(MethodsEntity)
          .values([
            {
              method: splitRolePermission[1],
            },
          ])
          .execute();
      }

      const findModule = await moduleRepository.findOne({
        where: { module: splitRolePermission[3] },
      });
      const findMethod = await methodRepository.findOne({
        where: { method: splitRolePermission[1] },
      });
      const findRole = await roleRepository.findOne({
        where: { role: splitRolePermission[0] },
      });

      let permission = await permissionRepository.findOne({ method, module });
      if (!permission) {
        permission = permissionRepository.create({
          methodId: findMethod.id,
          moduleId: findModule.id,
        });
        await permissionRepository.save(permission);
      }
      const rolePermission = rolePermissionRepository.create({
        permissionId: permission.id,
        roleId: findRole.id,
        posession: splitRolePermission[2],
      });

      await rolePermissionRepository.save(rolePermission);
    }
  }
}
