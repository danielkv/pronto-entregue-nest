import { Module } from '@nestjs/common';
import { UserModule } from '../user-association/user/user.module';
import { CreditBalanceModule } from './credit-balance/credit-balance.module';
import { CreditHistoryModule } from './credit-history/credit-history.module';

@Module({
    imports: [CreditBalanceModule, CreditHistoryModule, UserModule],
})
export class CreditAssociationModule {}
