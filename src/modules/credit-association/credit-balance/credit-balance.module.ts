import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { CreditHistoryModule } from '../credit-history/credit-history.module';
import { CreditBalance } from './entities/credit.balance.entity';
import { CreditBalanceListener } from './listeners/credit-balance.listener';
import { CalculateUserBalanceService } from './services/calculate-user-balance.service';
import { CreditBalanceService } from './services/creditBalanceService';
import { ValidateUserBalanceService } from './services/validate-user-balance.service';

@Module({
    imports: [CreditHistoryModule, NestjsQueryTypeOrmModule.forFeature([CreditBalance])],
    providers: [
        // helpers
        ValidateUserBalanceService,

        // listeners
        CreditBalanceListener,

        // services
        CreditBalanceService,
        CalculateUserBalanceService,
    ],
    exports: [ValidateUserBalanceService],
})
export class CreditBalanceModule {}
