import { Module } from '@nestjs/common';
import { DeliveryRepository } from './repositories/delivery.repository';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { DeliveryDTO } from './dtos/delivery.dto';
import { DeliveryAssembler } from './assemblers/delivery.assembler';
import { Delivery } from './entities/delivery.entity';
import { DeliveryInputDTO } from './dtos/delivery.input.dto';
import { DeliveryService } from './services/delivery.service';
import { SetDeliveryManService } from './services/set-delivery-man.service';
import { SetDeliveryManResolver } from './resolvers/set-delivery-man.resolver';

const deliveryTypeOrmModule = NestjsQueryTypeOrmModule.forFeature([Delivery]);

@Module({
    providers: [SetDeliveryManService, SetDeliveryManResolver],
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [deliveryTypeOrmModule],
            assemblers: [DeliveryAssembler],
            services: [DeliveryService],
            resolvers: [
                {
                    DTOClass: DeliveryDTO,
                    ServiceClass: DeliveryService,
                    AssemblerClass: DeliveryAssembler,
                    CreateDTOClass: DeliveryInputDTO,
                    UpdateDTOClass: DeliveryInputDTO,
                },
            ],
        }),
    ],
})
export class DeliveryModule {}
