import { RepositoryProviderFactory } from 'src/modules/common/helpers/repository-provider.factory';
import { RepositoryBase } from 'src/modules/common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { CreditBalanceFilterDTO } from '../dtos/credit-balance.filters.dto';
import { CreditBalance } from '../entities/credit.balance.entity';
import { CreditBalanceUserFilter } from '../filters/credit-balance.user.filter';
import { ICreditBalanceRepository } from '../interfaces/credit-balance.interface';

@EntityRepository(CreditBalance)
export class CreditBalanceRepository extends RepositoryBase<CreditBalance, CreditBalanceFilterDTO>
    implements ICreditBalanceRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('creditBalance');

        this.setFilters([new CreditBalanceUserFilter()]);
    }
}

export const CreditBalanceRepositoryProvider = new RepositoryProviderFactory(
    'ICreditBalanceRepository',
    CreditBalanceRepository,
).create();
