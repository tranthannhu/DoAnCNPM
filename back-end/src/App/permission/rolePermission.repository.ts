import { RolePermission } from 'src/entity/role_permission.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RolePermission)
export class RolePermissionRepository extends Repository<RolePermission> {}
