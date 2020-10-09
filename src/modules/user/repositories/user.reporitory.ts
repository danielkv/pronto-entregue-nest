import { RepositoryBase } from 'src/modules/common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { UserFilterDTO } from '../dtos/user.filter.dto';
import { User } from '../entities/user.entity';
import { UserCompanyFilter } from '../filters/user.company.filter';
import { UserIdFilter } from '../filters/user.id.filter';
import { UserActiveFilter } from '../filters/user.active.filter';
import { RepositoryProviderFactory } from 'src/modules/common/helpers/repository-provider.factory';

@EntityRepository(User)
export class UserRepository extends RepositoryBase<User, UserFilterDTO> {
    constructor() {
        super();
        this.setFilters([new UserCompanyFilter(), new UserIdFilter(), new UserActiveFilter()]);
    }
}

export const UserRepositoryProvider = new RepositoryProviderFactory('IUserRepository', UserRepository).create();
