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

    findByEmail(email: string) {
        const query = this.createQueryBuilder(this.tablename);

        query.where('email = :email').setParameters({ email });

        return query.getOne();
    }
}

export const UserRepositoryProvider = new RepositoryProviderFactory('IUserRepository', UserRepository).create();
