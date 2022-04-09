import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/entity/address.entity';
import { AuthModule } from '../auth/auth.module';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address, User]), AuthModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
