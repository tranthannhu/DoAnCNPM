import { Address } from './../../entity/address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class AddressService extends TypeOrmCrudService<Address> {
  constructor(@InjectRepository(Address) repo) {
    super(repo);
  }
}
