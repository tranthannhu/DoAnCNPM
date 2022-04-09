import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Profile } from '../../entity/profile.entity';
import { User } from '../../entity/user.entity';

define(Profile, (faker: typeof Faker, context: { payload?: Profile }) => {
  const { payload } = context;

  const profile = new Profile();
  profile.name = payload.name;
  profile.phone = payload.phone;
  profile.profileUrl = payload.profileUrl;
  profile.introduction = payload.introduction;
  profile.pageURL = payload.pageURL;
  profile.view = payload.view;
  return profile;
});
