import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { DeliveryRepository } from '../delivery/repositories/delivery.repository';
import { DeliveryAreaDTO } from './dtos/delivery.area.dto';
import { DeliveryAreaRepository } from './repositories/delivery.area.repository';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([DeliveryAreaRepository])],
            resolvers: [
                {
                    DTOClass: DeliveryAreaDTO,
                    EntityClass: DeliveryRepository,
                },
            ],
        }),
    ],
})
export class DeliveryAreaModule {}
