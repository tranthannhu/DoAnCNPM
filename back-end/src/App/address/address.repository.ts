import { EntityRepository, Repository } from 'typeorm';
import { Address } from 'src/entity/address.entity';
import { BaseRepository } from 'src/common/Base/base.repository';
@EntityRepository(Address)
export class AddressRepository extends BaseRepository<Address> {}
