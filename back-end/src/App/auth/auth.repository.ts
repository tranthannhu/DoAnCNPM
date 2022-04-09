import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {}
