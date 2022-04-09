import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Job } from '../../entity/job.entity';

define(Job, (faker: typeof Faker, context: { payload?: Job }) => {
  const { payload } = context;
  const name = payload.name;
  const job = new Job();
  job.name = name;
  job.description = payload.description;
  job.lowestWage = payload.lowestWage;
  job.highestWage = payload.highestWage;
  job.type = payload.type;
  job.experience = payload.experience;
  job.deadline = payload.deadline;
  job.user = payload.user;
  job.categories = payload.categories;
  job.address = payload.address;
  job.status = payload.status;
  job.introImg = payload.introImg;
  return job;
});
