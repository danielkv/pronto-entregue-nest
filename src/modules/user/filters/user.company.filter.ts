import { QueryBuilderBase } from 'src/modules/common/repositories/query.builder.base';
import { IFilter } from '../../common/interfaces/IFilter';
import { UserFilterDTO } from '../dtos/user.filter.dto';
import { User } from '../entities/user.entity';

export class UserCompanyFilter implements IFilter<User, UserFilterDTO> {
    async apply(
        query: QueryBuilderBase<User, UserFilterDTO>,
        filter: UserFilterDTO,
    ): Promise<QueryBuilderBase<User, UserFilterDTO>> {
        if (!filter?.companyId) return query;

        // check filter type
        const companyIds = !Array.isArray(filter.companyId) ? [filter.companyId] : filter.companyId;

        // apply filter
        query
            .leftJoin('user.companyUsers', 'companyUser')
            .andWhere('companyUser.companyId IN (:...companyIds)', { companyIds });

        //return filter
        return query;
    }
}
