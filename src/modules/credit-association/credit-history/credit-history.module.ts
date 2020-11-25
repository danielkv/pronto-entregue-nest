import { Module } from '@nestjs/common';
import { CreditHistoryFilterDTO } from './dtos/credit-history.filters.dto';
import { CreditHistoryRepositoryProvider } from './repositories/credit-history.repository';
import { CalculateUserCreditService } from './services/calculate-user-credit.service';

@Module({
    imports: [CreditHistoryFilterDTO],
    providers: [
        // services
        CalculateUserCreditService,

        // repositories
        CreditHistoryRepositoryProvider,
    ],
    exports: [CalculateUserCreditService],
})
export class CreditHistoryModule {}
