import { RepositoryBase } from 'src/modules/common/repositories/repository.base';
import { PageInfo } from 'src/modules/common/types/page-info';
import { EntityRepository } from 'typeorm';
import { UserFilterDTO } from '../dtos/user.filter.dto';
import { User } from '../entities/user.entity';
import { UserCompanyFilter } from '../filters/user.company.filter';
import { UserIdFilter } from '../filters/user.id.filter';
import { UserActiveFilter } from '../filters/user.active.filter';

@EntityRepository(User)
export class UserRepository extends RepositoryBase<User, UserFilterDTO> {
    constructor() {
        super();
        this.setFilters([new UserCompanyFilter(), new UserIdFilter(), new UserActiveFilter()]);
    }
    /**
     * Returns one or more instances of User
     * @param userId User ID or array with user IDs
     */
    async get(userId: number): Promise<User>;
    async get(userId: number[]): Promise<User[]>;
    async get(userId: any): Promise<User | User[]> {
        // create query builder
        const query = this.createQueryBuilder('user');

        // filter
        query.whereInIds(userId);

        // load results
        const users = await query.getMany();

        // return results
        return Array.isArray(userId) ? users : users[0];
    }

    /**
     * Returns array of Users filtered and paginated
     *
     * @param filter filter
     * @param pagination pagination
     */
    getList(filter: UserFilterDTO, pagination: PageInfo): Promise<User[]> {
        // create query builder
        const query = this.createQueryBuilder('user');

        // apply filters
        query.applyFilters(filter);

        // apply pagination
        query.applyPagination(pagination);

        // return results
        return query.getMany();
    }

    /**
     * Count filtered users
     *
     * @param filter filter
     */
    getCount(filter: UserFilterDTO): Promise<number> {
        // create query builder
        const query = this.createQueryBuilder('user');

        // apply filters
        query.applyFilters(filter);

        // return count
        return query.getCount();
    }
}
