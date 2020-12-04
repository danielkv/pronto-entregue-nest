import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { OrderOptionDTO } from './dtos/order.option.dto';
import { OrderOption } from './entities/order.option.entity';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([OrderOption])],
            resolvers: [
                {
                    DTOClass: OrderOptionDTO,
                    EntityClass: OrderOption,
                    create: { disabled: true },
                    delete: { disabled: true },
                    update: { disabled: true },
                    read: { disabled: true },
                },
            ],
        }),
    ],
})
export class OrderOptionModule {}
