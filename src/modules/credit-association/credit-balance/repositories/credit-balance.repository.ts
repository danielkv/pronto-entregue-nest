import { RepositoryProviderFactory } from '../../../common/helpers/repository-provider.factory';
import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { CreditBalanceFilterDTO } from '../dtos/credit-balance.filters.dto';
import { CreditBalance } from '../entities/credit.balance.entity';
import { ICreditBalanceRepository } from '../interfaces/credit-balance.interface';
import { User } from 'src/modules/user-association/user/entities/user.entity';

@EntityRepository(CreditBalance)
export class CreditBalanceRepository extends RepositoryBase<CreditBalance, CreditBalanceFilterDTO>
    implements ICreditBalanceRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('creditBalance');
    }

    async getUserBalance(userId: User['id']): Promise<number> {
        const query = this.createQueryBuilder(this.tablename);

        query.where('userId = :userId').setParameters({ userId });

        const balanceInstance = await query.getOne();

        return balanceInstance.value;
    }
}

export const CreditBalanceRepositoryProvider = new RepositoryProviderFactory(
    'ICreditBalanceRepository',
    CreditBalanceRepository,
).create();
