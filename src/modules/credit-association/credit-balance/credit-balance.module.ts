import { Module } from '@nestjs/common';
import { CreditBalanceFilterDTO } from './dtos/credit-balance.filters.dto';
import { CreditBalanceUserFilter } from './filters/credit-balance.user.filter';
import { CreditBalanceRepositoryProvider } from './repositories/credit-balance.repository';
import { GetUserCreditBalanceService } from './services/get.user-credit-balance.service';

@Module({
    imports: [CreditBalanceFilterDTO],
    providers: [
        // filters
        CreditBalanceUserFilter,

        // sevices
        GetUserCreditBalanceService,

        // repositories
        CreditBalanceRepositoryProvider,
    ],
    exports: [GetUserCreditBalanceService],
})
export class CreditBalanceModule {}
