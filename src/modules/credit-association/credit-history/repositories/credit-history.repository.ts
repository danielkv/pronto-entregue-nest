import { RepositoryProviderFactory } from '../../../common/helpers/repository-provider.factory';
import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { CreditHistoryFilterDTO } from '../dtos/credit-history.filters.dto';
import { CreditHistory } from '../entities/credit.history.entity';
import { ICreditHistoryRepository } from '../interfaces/credit-history.interface';

@EntityRepository(CreditHistory)
export class CreditHistoryRepository extends RepositoryBase<CreditHistory, CreditHistoryFilterDTO>
    implements ICreditHistoryRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('creditHistory');
    }
}

export const CreditHistoryRepositoryProvider = new RepositoryProviderFactory(
    'ICreditHistoryRepository',
    CreditHistoryRepository,
).create();
