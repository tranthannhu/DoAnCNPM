import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from '../../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Pagination, PaginationOption } from 'src/common/Paginate';
@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) repo,
    private readonly userRepository: UserRepository,
  ) {
    super(repo);
  }

  async paginate(options: PaginationOption): Promise<Pagination<User>> {
    const [results, count] = await this.userRepository.findAndCount({
      take: options.limit,
      skip: options.page,
      where: {
        active: false,
      },
      relations: ['role'],
      select: ['id', 'email', 'createdat', 'updatedat', 'role', 'roleId'],
    });
    return new Pagination<User>({ results, total: count, limit: options.limit });
  }
}
