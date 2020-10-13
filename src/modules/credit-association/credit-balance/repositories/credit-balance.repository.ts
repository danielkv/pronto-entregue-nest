import { RepositoryProviderFactory } from '../../../common/helpers/repository-provider.factory';
import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { CreditBalanceFilterDTO } from '../dtos/credit-balance.filters.dto';
import { CreditBalance } from '../entities/credit.balance.entity';
import { ICreditBalanceRepository } from '../interfaces/credit-balance.interface';

@EntityRepository(CreditBalance)
export class CreditBalanceRepository extends RepositoryBase<CreditBalance, CreditBalanceFilterDTO>
    implements ICreditBalanceRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('creditBalance');
    }
}

export const CreditBalanceRepositoryProvider = new RepositoryProviderFactory(
    'ICreditBalanceRepository',
    CreditBalanceRepository,
).create();
