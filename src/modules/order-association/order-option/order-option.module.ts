import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { OrderOptionDTO } from './dtos/order.option.dto';
import { OrderOptionRepository } from './repositories/order-option.repository';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([OrderOptionRepository])],
            resolvers: [
                {
                    DTOClass: OrderOptionDTO,
                    EntityClass: OrderOptionRepository,
                    delete: { disabled: true },
                },
            ],
        }),
    ],
})
export class OrderOptionModule {}
