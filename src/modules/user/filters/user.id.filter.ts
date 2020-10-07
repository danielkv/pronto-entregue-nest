import { QueryBuilderBase } from 'src/modules/common/repositories/query.builder.base';
import { IFilter } from '../../common/interfaces/IFilter';
import { UserFilterDTO } from '../dtos/user.filter.dto';
import { User } from '../entities/user.entity';

export class UserIdFilter implements IFilter<User, UserFilterDTO> {
    apply(
        query: QueryBuilderBase<User, UserFilterDTO>,
        filter: UserFilterDTO,
    ): QueryBuilderBase<User, UserFilterDTO> {
        if (!filter?.userId) return query;

        // apply filter
        query.whereInIds(filter.userId);

        //return filter
        return query;
    }
}
