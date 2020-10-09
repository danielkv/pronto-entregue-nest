import { Module } from '@nestjs/common';
import { CreditBalanceFilterDTO } from './dtos/credit-balance.filters.dto';
import { CreditBalanceRepositoryProvider } from './repositories/credit-balance.repository';

@Module({ imports: [CreditBalanceFilterDTO], providers: [CreditBalanceRepositoryProvider] })
export class CreditBalanceModule {}
