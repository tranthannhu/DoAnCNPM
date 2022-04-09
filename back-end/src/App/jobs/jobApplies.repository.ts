import { BaseRepository } from 'src/common/Base/base.repository';
import { EntityRepository, Repository } from 'typeorm';
import { AppliedJob } from '../../entity/applied_job.entity';
@EntityRepository(AppliedJob)
export class AppliesJobRepo extends BaseRepository<AppliedJob> {}
