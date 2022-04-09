import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entity/user.entity';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { AuthServices } from '../auth/auth.service';
import { Role } from '../../entity/role.entity';
import { AuthModule } from '../auth/auth.module';
import { Address } from 'src/entity/address.entity';
import { UserRepository } from './user.repository';
import { Profile } from '../../entity/profile.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, Role, Address, Profile]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
