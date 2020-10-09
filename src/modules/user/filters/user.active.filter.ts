import { QueryBuilderBase } from '../../common/repositories/query.builder.base';
import { IFilter } from '../../common/interfaces/IFilter';
import { UserFilterDTO } from '../dtos/user.filter.dto';
import { User } from '../entities/user.entity';

export class UserActiveFilter implements IFilter<User, UserFilterDTO> {
    apply(
        query: QueryBuilderBase<User, UserFilterDTO>,
        filter: UserFilterDTO,
    ): QueryBuilderBase<User, UserFilterDTO> {
        if (filter?.onlyActive === false) return query;

        // apply filter
        query.andWhere('user.active');

        //return filter
        return query;
    }
}
