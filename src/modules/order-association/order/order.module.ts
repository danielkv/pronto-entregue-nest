import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { OrderDTO } from './dtos/order.dto';
import { OrderListener } from './listeners/order.listener';
import { OrderService } from './services/order.service';
import { OrderInputDTO } from './dtos/order-input.dto';
import { AddressModule } from 'src/modules/address/address.module';
import { Order } from './entities/order.entity';
import { OrderAssembler } from './assemblers/order.assembler';
import { ChangeOrderStatusService } from './services/change-order-status.service';
import { OrderResolver } from './resolvers/order.resolver';
import { NotifyNewOrderService } from './services/notify-new-order.service';
import { CompanyModule } from 'src/modules/company-association/company/company.module';
import { TasksService } from './schedulers/order.scheduler';
import { NotifyDelayedOrderService } from './services/notify-delayed-order.service';

const orderTypeOrmModule = NestjsQueryTypeOrmModule.forFeature([Order]);

@Module({
    imports: [
        AddressModule,
        CompanyModule,

        NestjsQueryGraphQLModule.forFeature({
            imports: [orderTypeOrmModule],
            services: [OrderService],
            assemblers: [OrderAssembler],
            resolvers: [
                {
                    DTOClass: OrderDTO,
                    CreateDTOClass: OrderInputDTO,
                    UpdateDTOClass: OrderInputDTO,
                    ServiceClass: OrderService,
                    update: { many: { disabled: true } },
                    create: { many: { disabled: true } },
                    delete: { disabled: true },
                },
            ],
        }),
        orderTypeOrmModule,
    ],
    providers: [
        // services
        ChangeOrderStatusService,
        NotifyNewOrderService,
        NotifyDelayedOrderService,

        // resolvers
        OrderResolver,

        // listeners
        OrderListener,

        // schedulers
        TasksService,
    ],
    exports: [orderTypeOrmModule],
})
export class OrderModule {}
