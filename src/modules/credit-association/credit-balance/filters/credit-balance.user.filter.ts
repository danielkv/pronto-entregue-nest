import { IFilter } from '../../../common/interfaces/IFilter';
import { QueryBuilderBase } from '../../../common/repositories/query.builder.base';
import { CreditBalanceFilterDTO } from '../dtos/credit-balance.filters.dto';
import { CreditBalance } from '../entities/credit.balance.entity';

export class CreditBalanceUserFilter implements IFilter<CreditBalance, CreditBalanceFilterDTO> {
    apply(
        query: QueryBuilderBase<CreditBalance, CreditBalanceFilterDTO>,
        filter: CreditBalanceFilterDTO,
    ): QueryBuilderBase<CreditBalance, CreditBalanceFilterDTO> {
        if (!filter?.userId) return query;

        // apply filter
        query.andWhereInIds(filter.userId);

        //return filter
        return query;
    }
}
