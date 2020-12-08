import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { DeliveryDTO } from './dtos/delivery.dto';
import { DeliveryAssembler } from './assemblers/delivery.assembler';
import { Delivery } from './entities/delivery.entity';
import { DeliveryInputDTO } from './dtos/delivery.input.dto';
import { DeliveryService } from './services/delivery.service';
import { SetDeliveryManService } from './services/set-delivery-man.service';
import { SetDeliveryManResolver } from './resolvers/set-delivery-man.resolver';
import { AddressModule } from '../address/address.module';
import { CreateDeliveryFromOrderService } from './services/create-delivery-from-order.service';
import { UserModule } from '../user-association/user/user.module';
import { UserMetaModule } from '../user-association/user-meta/user-meta.module';
import { CompanyModule } from '../company-association/company/company.module';
import { DeliveryListener } from './listeners/delivery.listener';

const deliveryTypeOrmModule = NestjsQueryTypeOrmModule.forFeature([Delivery]);

@Module({
    providers: [SetDeliveryManService, SetDeliveryManResolver, CreateDeliveryFromOrderService, DeliveryListener],
    imports: [
        AddressModule,
        UserModule,
        UserMetaModule,
        CompanyModule,
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
