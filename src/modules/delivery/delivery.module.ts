import { Module } from '@nestjs/common';
import { DeliveryRepository } from './repositories/delivery.repository';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { DeliveryDTO } from './dtos/delivery.dto';
import { DeliveryAssembler } from './assemblers/delivery.assembler';
import { Delivery } from './entities/delivery.entity';
import { DeliveryInputDTO } from './dtos/delivery.input.dto';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([Delivery])],
            assemblers: [DeliveryAssembler],
            resolvers: [
                {
                    DTOClass: DeliveryDTO,
                    AssemblerClass: DeliveryAssembler,
                    CreateDTOClass: DeliveryInputDTO,
                    UpdateDTOClass: DeliveryInputDTO,
                },
            ],
        }),
    ],
})
export class DeliveryModule {}
