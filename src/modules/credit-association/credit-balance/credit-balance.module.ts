import { Module } from '@nestjs/common';
import { CreditBalanceRepositoryProvider } from './repositories/credit-balance.repository';

@Module({
    providers: [
        // repositories
        CreditBalanceRepositoryProvider,
    ],
})
export class CreditBalanceModule {}
