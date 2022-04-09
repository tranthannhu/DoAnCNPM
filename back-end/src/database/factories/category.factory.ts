import { define } from 'typeorm-seeding';
import { Category } from '../../entity/category.entity';
import * as Faker from 'faker';
import { getSlug } from '../../core/utils/helper';
define(Category, (
  faker: typeof Faker,
  context: { payload?: Category; parent?: Category },
) => {
  const { payload, parent } = context;
  const name = payload.name || faker.lorem.word();
  const slug = getSlug(name);

  const category = new Category();
  category.name = name;
  category.slug = slug;
  category.user = payload.user;
  category.user = payload.user;
  if (!parent) {
    return category;
  }
  category.parent = parent;
  return category;
});
