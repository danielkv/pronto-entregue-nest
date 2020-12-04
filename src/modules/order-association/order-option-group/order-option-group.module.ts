import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { OrderOptionGroupDTO } from './dtos/order.option.group.dto';
import { OrderOptionGroup } from './entities/order.option.group.entity';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([OrderOptionGroup])],
            resolvers: [
                {
                    DTOClass: OrderOptionGroupDTO,
                    EntityClass: OrderOptionGroup,
                    create: { disabled: true },
                    delete: { disabled: true },
                    update: { disabled: true },
                    read: { disabled: true },
                },
            ],
        }),
    ],
})
export class OrderOptionGroupModule {}
