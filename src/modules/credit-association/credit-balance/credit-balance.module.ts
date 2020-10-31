import { Module } from '@nestjs/common';
import { CreditBalanceFilterDTO } from './dtos/credit-balance.filters.dto';
import { CreditBalanceUserFilter } from './filters/credit-balance.user.filter';
import { CreditBalanceListener } from './listeners/credit-balance.listener';
import { CreditBalanceRepositoryProvider } from './repositories/credit-balance.repository';
import { CreateUserCreditBalanceService } from './services/create-user-credit-balance.service';
import { UpdateUserCreditBalanceService } from './services/update.user-credit-balance.service';
import { GetUserCreditBalanceService } from './services/get.user-credit-balance.service';
import { CreditHistoryModule } from '../credit-history/credit-history.module';

@Module({
    imports: [CreditBalanceFilterDTO, CreditHistoryModule],
    providers: [
        // filters
        CreditBalanceUserFilter,

        // listeners
        CreditBalanceListener,

        // sevices
        GetUserCreditBalanceService,
        CreateUserCreditBalanceService,
        UpdateUserCreditBalanceService,

        // repositories
        CreditBalanceRepositoryProvider,
    ],
    exports: [GetUserCreditBalanceService],
})
export class CreditBalanceModule {}
