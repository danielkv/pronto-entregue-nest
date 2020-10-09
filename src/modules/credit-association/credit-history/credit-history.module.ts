import { Module } from '@nestjs/common';
import { CreditHistoryFilterDTO } from './dtos/credit-history.filters.dto';
import { CreditHistoryRepositoryProvider } from './repositories/credit-history.repository';

@Module({ imports: [CreditHistoryFilterDTO], providers: [CreditHistoryRepositoryProvider] })
export class CreditHistoryModule {}
