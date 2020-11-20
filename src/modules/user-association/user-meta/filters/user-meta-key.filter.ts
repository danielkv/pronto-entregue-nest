import { QueryBuilderBase } from '../../../common/repositories/query.builder.base';
import { IFilter } from '../../../common/interfaces/IFilter';
import { UserMeta } from '../entities/user.meta.entity';
import { UserMetaFilterDTO } from '../dtos/user-meta.filter.dto';

export class UserMetaKeyFilter implements IFilter<UserMeta, UserMetaFilterDTO> {
    apply(
        query: QueryBuilderBase<UserMeta, UserMetaFilterDTO>,
        filter: UserMetaFilterDTO,
    ): QueryBuilderBase<UserMeta, UserMetaFilterDTO> {
        if (!filter?.key) return query;

        // apply filter
        query.andWhere('userMeta.key = :key').setParameters({ key: filter.key });

        //return filter
        return query;
    }
}
