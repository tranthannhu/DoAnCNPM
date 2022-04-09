import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../entity/user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { BaseRepository } from 'src/common/Base/base.repository';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {
  async findByEmail(email: string): Promise<User> {
    try {
      return this.findOne({ email });
    } catch (error) {
      throw new HttpException(
        {
          message: 'User not Found',
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.OK,
      );
    }
  }
  async findByUsername(username: string): Promise<User> {
    try {
      return this.findOne({ where: { username } });
    } catch (error) {
      throw new HttpException(
        {
          message: 'User not Found',
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.OK,
      );
    }
  }
}
