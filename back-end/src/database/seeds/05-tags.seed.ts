import { User } from '../../entity/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import * as _ from 'lodash';
import * as jobs from '../data/jobs.json';
import { Tag } from 'src/App/tags/entities/tag.entity';

export default class TagSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const userRepository = connection.getRepository(User);
    const tagRepository = connection.getRepository(Tag);
    const newTags = new Set<string>();

    for (let index = 0; index < jobs.length; index++) {
        _.forEach(jobs[index].tags, (tag) => {
            newTags.add(tag);
        });      
    }
    
    for (let tag of newTags)
    {
        await factory(Tag)({
          payload: {
          name: tag,
          // author: user[Math.floor(Math.random() * 6)],
        },
      }).create();
    }
    // for (let index = 0; index < newTags.length; index++) {
    //   await factory(Tag)({
    //     payload: {
    //       name: newTags[index],
    //       author: user[Math.floor(Math.random() * 6)],
    //     },
    //   }).create();
    // }
  }
}