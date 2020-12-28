import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { CreditHistoryInputDTO } from './dtos/credit-history-input.dto';
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
                    DTOClass: CreditHistoryDTO,
                    EntityClass: CreditHistory,
                    CreateDTOClass: CreditHistoryInputDTO,
                    ServiceClass: CreditHistoryService,
                },
            ],
        }),
        creditHistoryTypeOrmModule,
    ],
    exports: [creditHistoryTypeOrmModule],
})
export class CreditHistoryModule {}
