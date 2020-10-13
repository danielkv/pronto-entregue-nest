import { RepositoryBase } from '../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { UserFilterDTO } from '../dtos/user.filter.dto';
import { User } from '../entities/user.entity';
import { RepositoryProviderFactory } from '../../common/helpers/repository-provider.factory';

@EntityRepository(User)
export class UserRepository extends RepositoryBase<User, UserFilterDTO> {
    constructor() {
        super();

        this.setQueryBuilderTableName('user');
    }
}

export const UserRepositoryProvider = new RepositoryProviderFactory('IUserRepository', UserRepository).create();
