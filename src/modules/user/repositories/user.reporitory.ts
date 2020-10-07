import { RepositoryBase } from 'src/modules/common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { UserFilter } from '../dtos/user.filter';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends RepositoryBase<User, UserFilter> {}
