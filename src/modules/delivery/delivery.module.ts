import { Module } from '@nestjs/common';
import { DeliveryRepository } from './repositories/delivery.repository';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { DeliveryDTO } from './dtos/delivery.dto';
import { DeliveryAssembler } from './assemblers/delivery.assembler';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([DeliveryRepository])],
            resolvers: [{ DTOClass: DeliveryDTO, EntityClass: DeliveryRepository }],
            //assemblers: [DeliveryAssembler],
        }),
    ],
})
export class DeliveryModule {}
