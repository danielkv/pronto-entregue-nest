import { QueryBuilderBase } from '../../../common/repositories/query.builder.base';
import { IFilter } from '../../../common/interfaces/IFilter';
import { UserMeta } from '../entities/user.meta.entity';
import { UserMetaFilterDTO } from '../dtos/user-meta.filter.dto';

export class UserMetaUserFilter implements IFilter<UserMeta, UserMetaFilterDTO> {
    apply(
        query: QueryBuilderBase<UserMeta, UserMetaFilterDTO>,
        filter: UserMetaFilterDTO,
    ): QueryBuilderBase<UserMeta, UserMetaFilterDTO> {
        if (!filter?.userId) return query;

        // apply filter
        query.andWhere('userMeta.userId = :userId').setParameters({ userId: filter.userId });

        //return filter
        return query;
    }
}
