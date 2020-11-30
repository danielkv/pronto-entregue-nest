import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { OrderDTO } from './dtos/order.dto';
import { OrderRepository } from './repositories/order.repository';
import { OrderService } from './services/order.service';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([OrderRepository])],
            services: [OrderService],
            resolvers: [
                {
                    DTOClass: OrderDTO,
                    EntityClass: OrderRepository,
                    ServiceClass: OrderService,
                    update: { many: { disabled: true } },
                    create: { many: { disabled: true } },
                    delete: { disabled: true },
                },
            ],
        }),
    ],
})
export class OrderModule {}
