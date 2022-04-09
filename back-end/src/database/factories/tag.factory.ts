import { define } from 'typeorm-seeding';	
import * as Faker from 'faker';	
import { getSlug } from '../../core/utils/helper';	
import { Tag } from 'src/App/tags/entities/tag.entity';

define(Tag, (faker: typeof Faker, context: { payload?: Tag }) => {	
  const { payload } = context;	

  const name = payload.name;	

  const tag = new Tag();	
  tag.name = name;	
//   tag.author = payload.author;	
  return tag;
});	
