import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { OrderOptionGroupDTO } from './dtos/order.option.group.dto';
import { OrderOptionGroupRepository } from './repository/order-option-group.repository';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([OrderOptionGroupRepository])],
            resolvers: [
                {
                    DTOClass: OrderOptionGroupDTO,
                    EntityClass: OrderOptionGroupRepository,
                },
            ],
        }),
    ],
})
export class OrderOptionGroupModule {}
