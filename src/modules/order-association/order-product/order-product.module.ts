import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { OrderProductDTO } from './dtos/order.product.dto';
import { OrderProduct } from './entities/order.product.entity';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([OrderProduct])],
            resolvers: [
                {
                    DTOClass: OrderProductDTO,
                    EntityClass: OrderProduct,
                    create: { disabled: true },
                    delete: { disabled: true },
                    update: { disabled: true },
                    read: { disabled: true },
                },
            ],
        }),
    ],
})
export class OrderProductModule {}
