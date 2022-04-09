import { BaseRepository } from 'src/common/Base/base.repository';
import { EntityRepository, Repository } from 'typeorm';
import { getManager, Connection } from 'typeorm';
import { Job } from 'src/entity/job.entity';
import { Tag } from '../tags/entities/tag.entity';

@EntityRepository(Job)
export class JobRepository extends BaseRepository<Job> {

    /**
     *
     */
    constructor(private readonly connections: Connection) {
        super();

    }
    async getAllProfileItem() {
        const manager = await getManager();
        const result = await manager.query(`
        SELECT jobs.id, tags.name  FROM dbo.jobs inner join job_tag on jobs.id = job_tag.jobId inner join tags on tags.id = job_tag.tagId`);
        return this.groupBy(result, x => x.id);
    }

    async getAllCurrentTagsAsync() {
        return this.connections.getRepository(Tag).find({ select: ['id', 'name'] });
    }

    private groupBy(list, keyGetter) {
        const map = new Map();
        list.forEach(item => {
            const key = keyGetter(item);
            const collection = map.get(key);

            if (!collection) {
                map.set(key, [item.name])
            } else {
                collection.push(item.name);
            }
        });
        return Array.from(map, ([name, value]) => ({ name, value }));
    }
}
