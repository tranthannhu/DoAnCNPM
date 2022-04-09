import { User } from '../../entity/user.entity';
import { Address } from '../../entity/address.entity';
import { Connection, getConnection, getManager } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import * as companyProfile from '../data/profile.json';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import axios from 'axios';
import slugify from 'slugify';
import * as Faker from 'faker';
import { Profile } from '../../entity/profile.entity';
import RoleId from '../../../src/types/RoleId';

export default class CompanySeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const companyRepository = connection.getRepository(User);
    const addressRepository = connection.getRepository(Address);

    const provinces = await await axios.get(
      'https://vapi.vnappmob.com/api/province',
    );
    for (let index = 0; index < companyProfile.length; index++) {
      const splitAddress = _.split(companyProfile[index].address, ',');

      const city = this.getSlug(_.last(splitAddress));

      for (let track = 0; track < provinces.data.results.length; track++) {
        const splitProvince = _.split(
          this.getSlug(provinces.data.results[track].province_name),
          '-',
        );
        if (_.indexOf(splitProvince, 'pho') >= 0) {
          splitProvince.splice(0, 2);
        } else {
          splitProvince.splice(0, 1);
        }
        const joinProvince = splitProvince.join('-');

        if (joinProvince === city) {
          const profile = await factory(Profile)({
            payload: {
              name: companyProfile[index].name,
              profileUrl: companyProfile[index].logoImage,
              introduction: 'What makes you special',
            },
          }).create();
          const firstName = Faker.name.firstName();
          const lastName = Faker.name.lastName();
          const email = Faker.internet.email(firstName, lastName);

          await factory(Address)({
            payload: {
              city: provinces.data.results[track].province_id,
              description: companyProfile[index].address,
            },
          }).create();

          const findAddress = await addressRepository.findOne({
            order: { createdat: 'DESC' },
          });
          await getConnection()
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([
              {
                email: email,
                password: await bcrypt.hash('admin', 12),
                roleId: RoleId.CONTRIBUTOR,
                profile,
              },
            ])
            .execute();
          const findCompany = await companyRepository.findOne({
            order: { createdat: 'DESC' },
          });
          const manager = getManager();
          await manager.query(
            `INSERT INTO user_address values ('${findCompany.id}', '${findAddress.id}')`,
          );
        }
      }
    }
  }

  getSlug(slug: string) {
    return slugify(slug, {
      replacement: '-', // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: 'vi',
    });
  }
}
