import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { OrderProductDTO } from './dtos/order.product.dto';
import { OrderProductRepository } from './repositories/order-product.repository';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([OrderProductRepository])],
            resolvers: [
                {
                    DTOClass: OrderProductDTO,
                    EntityClass: OrderProductRepository,
                    delete: { disabled: true },
                },
            ],
        }),
    ],
})
export class OrderProductModule {}
