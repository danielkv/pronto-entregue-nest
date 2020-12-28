import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { CreditHistoryDTO } from './dtos/credit.history.dto';
import { CreditHistory } from './entities/credit.history.entity';

const creditHistoryTypeOrmModule = NestjsQueryTypeOrmModule.forFeature([CreditHistory]);

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [creditHistoryTypeOrmModule],

            resolvers: [
                {
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
