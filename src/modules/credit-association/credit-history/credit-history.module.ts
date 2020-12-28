import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { CreditHistoryDTO } from './dtos/credit.history.dto';
import { CreditHistory } from './entities/credit.history.entity';
import { CreditHistoryService } from './services/credit-history.service';

const creditHistoryTypeOrmModule = NestjsQueryTypeOrmModule.forFeature([CreditHistory]);

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [creditHistoryTypeOrmModule],
            services: [CreditHistoryService],
            resolvers: [
                {
                    ServiceClass: CreditHistoryService,
                    DTOClass: CreditHistoryDTO,
                    EntityClass: CreditHistory,
                },
            ],
        }),
        creditHistoryTypeOrmModule,
    ],
    exports: [creditHistoryTypeOrmModule],
})
export class CreditHistoryModule {}
