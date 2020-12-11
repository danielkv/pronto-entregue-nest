import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { DeliveryManDTO } from './dtos/delivery-man.dto';
import { DeliveryMan } from './entities/delivery-man.entity';

const deliveryManTypeOrmModule = NestjsQueryTypeOrmModule.forFeature([DeliveryMan]);

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [deliveryManTypeOrmModule],
            resolvers: [
                {
                    DTOClass: DeliveryManDTO,
                    EntityClass: DeliveryMan,
                },
            ],
        }),
    ],
})
export class DeliverManModule {}
