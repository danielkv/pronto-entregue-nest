import { Module } from '@nestjs/common';
import { CreditBalanceFilterDTO } from './dtos/credit-balance.filters.dto';
import { CreditBalanceUserFilter } from './filters/credit-balance.user.filter';
import { CreditBalanceRepositoryProvider } from './repositories/credit-balance.repository';

@Module({
    imports: [CreditBalanceFilterDTO],
    providers: [
        // filters
        CreditBalanceUserFilter,

        // repositories
        CreditBalanceRepositoryProvider,
    ],
})
export class CreditBalanceModule {}
