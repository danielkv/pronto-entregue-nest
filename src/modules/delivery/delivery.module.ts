import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { DeliveryDTO } from './dtos/delivery.dto';
import { DeliveryAssembler } from './assemblers/delivery.assembler';
import { Delivery } from './entities/delivery.entity';
import { DeliveryInputDTO } from './dtos/delivery.input.dto';
import { DeliveryService } from './services/delivery.service';
import { SetDeliveryManService } from './services/set-delivery-man.service';
import { DeliveryResolver } from './resolvers/delivery.resolver';
import { AddressModule } from '../address/address.module';
import { CreateDeliveryFromOrderService } from './services/create-delivery-from-order.service';
import { UserModule } from '../user-association/user/user.module';
import { UserMetaModule } from '../user-association/user-meta/user-meta.module';
import { CompanyModule } from '../company-association/company/company.module';
import { DeliveryListener } from './listeners/delivery.listener';
import { ChangeDeliveryStatusService } from './services/change-delivery-status.service';
import { OrderModule } from '../order-association/order/order.module';
import { NotifyDeliveryChangeStatusService } from './services/notify-delivery-status-change.service';
import { StatusLabelsHelper } from './helpers/status-labels.helper';
import { NotifyDeliveryMenService } from './services/notify-delivery-men.service';
import { WaitingStatus } from './helpers/status-labels/waiting-status.helper';
import { DeliveringStatus } from './helpers/status-labels/delivering-status.helper';
import { DeliveredStatus } from './helpers/status-labels/delivered-status.helper';
import { CanceledStatus } from './helpers/status-labels/canceled-status.helper';
import { WaitingDeliveryStatus } from './helpers/status-labels/waiting-delivery-status.helper';
import { NotifyDeliveryMenSetService } from './services/notify-delivery-man-set.service';
import { DeliveryScheduler } from './schedulers/delivery.scheduler';

const deliveryTypeOrmModule = NestjsQueryTypeOrmModule.forFeature([Delivery]);

@Module({
    providers: [
        // services
        SetDeliveryManService,
        CreateDeliveryFromOrderService,
        ChangeDeliveryStatusService,

        NotifyDeliveryChangeStatusService,
        NotifyDeliveryMenService,
        NotifyDeliveryMenSetService,

        // helpers
        StatusLabelsHelper,
        WaitingStatus,
        WaitingDeliveryStatus,
        DeliveringStatus,
        DeliveredStatus,
        CanceledStatus,

        // scheduler
        DeliveryScheduler,

        // listeners
        DeliveryListener,

        // resolvers
        DeliveryResolver,
    ],
    imports: [
        OrderModule,
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
