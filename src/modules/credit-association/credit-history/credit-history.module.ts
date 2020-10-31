import { Module } from '@nestjs/common';
import { CreditHistoryFilterDTO } from './dtos/credit-history.filters.dto';
import { CreditHistoryUserFilter } from './filters/credit-history.user.filter';
import { CreditHistoryRepositoryProvider } from './repositories/credit-history.repository';
import { CalculateUserCreditService } from './services/calculate-user-credit.service';
import { CountCreditHistoriesService } from './services/count-credit-hitories.service';
import { ListCreditHistoriesService } from './services/list-credit-hitories.service';

@Module({
    imports: [CreditHistoryFilterDTO],
    providers: [
        // filters
        CreditHistoryUserFilter,

        // services
        CalculateUserCreditService,
        ListCreditHistoriesService,
        CountCreditHistoriesService,

        // repositories
        CreditHistoryRepositoryProvider,
    ],
    exports: [CalculateUserCreditService],
})
export class CreditHistoryModule {}
