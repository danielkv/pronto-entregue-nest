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

        // apply filter
        query.andWhereInIds(filter.userId);

        //return filter
        return query;
    }
}
