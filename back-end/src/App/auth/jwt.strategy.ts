import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthServices } from './auth.service';
import { Role } from 'src/entity/role.entity';
import * as _ from 'lodash';
import { UserRepository } from '../users/user.repository';
// import { AuthServices } from './auth.service';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthServices,
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }
  async validate(payload: any, done: VerifiedCallback) {
    const currentUser = await this.userRepository.findOne({
      where: { id: payload.id },
    });

    if (currentUser && currentUser.ExpiredToken) {
      throw new UnauthorizedException('Session has expired! Try login Again');
    }
    const permissionRole = [];
    const rolePermissions: Role = await this.authService.getRolesPermission(
      payload.role,
    );
    rolePermissions.rolePermission.forEach(permission => {
      const rolePermission = `${_.toUpper(payload.role)}_${_.toUpper(
        permission.permission.method.method,
      )}_${_.toUpper(permission.posession)}_${_.toUpper(
        permission.permission.module.module,
      )}`;
      permissionRole.push(rolePermission);
    });
    return { users: payload, permission: permissionRole };
  }
}
