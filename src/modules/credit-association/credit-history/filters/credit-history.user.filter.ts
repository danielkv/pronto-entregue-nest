import { IFilter } from '../../../common/interfaces/IFilter';
import { QueryBuilderBase } from '../../../common/repositories/query.builder.base';
import { CreditHistoryFilterDTO } from '../dtos/credit-history.filters.dto';
import { CreditHistory } from '../entities/credit.history.entity';

export class CreditHistoryUserFilter implements IFilter<CreditHistory, CreditHistoryFilterDTO> {
    apply(
        query: QueryBuilderBase<CreditHistory, CreditHistoryFilterDTO>,
        filter: CreditHistoryFilterDTO,
    ): QueryBuilderBase<CreditHistory, CreditHistoryFilterDTO> {
        if (!filter?.userId) return query;

        // check filter type
        const userIds = !Array.isArray(filter.userId) ? [filter.userId] : filter.userId;
        if (!userIds.length) return query;

        // apply filter
        query.where('userId IN (:...userIds)').setParameters({ userIds });

        //return filter
        return query;
    }
}
