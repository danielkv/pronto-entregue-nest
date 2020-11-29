import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { CreditHistoryFilterDTO } from './dtos/credit-history.filters.dto';
import { CreditHistoryDTO } from './dtos/credit.history.dto';
import { CreditHistoryRepository, CreditHistoryRepositoryProvider } from './repositories/credit-history.repository';
import { CalculateUserCreditService } from './services/calculate-user-credit.service';

@Module({
    imports: [
        CreditHistoryFilterDTO,
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([CreditHistoryRepository])],
            resolvers: [
                {
                    DTOClass: CreditHistoryDTO,
                    EntityClass: CreditHistoryRepository,
                },
            ],
        }),
    ],
    providers: [
        // services
        CalculateUserCreditService,

        // repositories
        CreditHistoryRepositoryProvider,
    ],
})
export class CreditHistoryModule {}
