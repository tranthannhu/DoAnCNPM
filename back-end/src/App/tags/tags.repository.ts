import { BaseRepository } from "src/common/Base/base.repository";
import { Connection, EntityRepository } from "typeorm";
import { Tag } from "./entities/tag.entity";

@EntityRepository(Tag)
export class TagRepository extends BaseRepository<Tag> {

    /**
     *
     */
    constructor(private readonly connections: Connection) {
        super();

    }
}
