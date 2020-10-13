import { Module } from '@nestjs/common';
import { CreditHistoryFilterDTO } from './dtos/credit-history.filters.dto';
import { CreditHistoryUserFilter } from './filters/credit-history.user.filter';
import { CreditHistoryRepositoryProvider } from './repositories/credit-history.repository';

@Module({
    imports: [CreditHistoryFilterDTO],
    providers: [
        // filters
        CreditHistoryUserFilter,

        // repositories
        CreditHistoryRepositoryProvider,
    ],
})
export class CreditHistoryModule {}
