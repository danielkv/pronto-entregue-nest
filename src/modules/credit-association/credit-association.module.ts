import { Module } from '@nestjs/common';
import { CreditBalanceModule } from './credit-balance/credit-balance.module';
import { CreditHistoryModule } from './credit-history/credit-history.module';

@Module({
  imports: [CreditBalanceModule, CreditHistoryModule]
})
export class CreditAssociationModule {}
