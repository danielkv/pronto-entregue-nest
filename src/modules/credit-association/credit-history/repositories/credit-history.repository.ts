import { RepositoryProviderFactory } from 'src/modules/common/helpers/repository-provider.factory';
import { RepositoryBase } from 'src/modules/common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { CreditHistoryFilterDTO } from '../dtos/credit-history.filters.dto';
import { CreditHistory } from '../entities/credit.history.entity';
import { CreditHistoryUserFilter } from '../filters/credit-history.user.filter';
import { ICreditHistoryRepository } from '../interfaces/credit-history.interface';

@EntityRepository(CreditHistory)
export class CreditHistoryRepository extends RepositoryBase<CreditHistory, CreditHistoryFilterDTO>
    implements ICreditHistoryRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('creditHistory');

        this.setFilters([new CreditHistoryUserFilter()]);
    }
}

export const CreditHistoryRepositoryProvider = new RepositoryProviderFactory(
    'ICreditHistoryRepository',
    CreditHistoryRepository,
).create();
