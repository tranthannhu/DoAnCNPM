import { define, factory } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Address } from '../../entity/address.entity';

define(Address, (faker: typeof Faker, context: { payload?: Address }) => {
  const { payload } = context;

  const address = new Address();
  address.city = payload.city;
  address.description = payload.description;
  address.latitude = payload.latitude;
  address.longitude = payload.longitude;
  return address;
});
