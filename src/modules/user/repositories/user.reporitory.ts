import { RepositoryBase } from 'src/modules/common/repositories/repository.base';
import { Connection, EntityRepository } from 'typeorm';
import { UserFilterDTO } from '../dtos/user.filter.dto';
import { User } from '../entities/user.entity';
import { UserCompanyFilter } from '../filters/user.company.filter';
import { UserIdFilter } from '../filters/user.id.filter';
import { UserActiveFilter } from '../filters/user.active.filter';
import { FactoryProvider } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends RepositoryBase<User, UserFilterDTO> {
    constructor() {
        super();
        this.setFilters([new UserCompanyFilter(), new UserIdFilter(), new UserActiveFilter()]);
    }
}

export const UserRepositoryProvider: FactoryProvider<UserRepository> = {
    provide: 'IUserRepository',
    useFactory: (connection: Connection) => connection.getCustomRepository(UserRepository),
    inject: [Connection],
};
