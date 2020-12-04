import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { OrderDTO } from './dtos/order.dto';
import { OrderListener } from './listeners/order.listener';
import { OrderService } from './services/order.service';
import { NotificationModule } from '../../notification/notification.module';
import { OrderInputDTO } from './dtos/order-input.dto';
import { AddressModule } from 'src/modules/address/address.module';
import { Order } from './entities/order.entity';
import { OrderAssembler } from './assemblers/order.assembler';

@Module({
    imports: [
        NotificationModule,
        AddressModule,
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([Order])],
            services: [OrderService],
            assemblers: [OrderAssembler],
            resolvers: [
                {
                    DTOClass: OrderDTO,
                    CreateDTOClass: OrderInputDTO,
                    UpdateDTOClass: OrderInputDTO,
                    //EntityClass: Order,
                    ServiceClass: OrderService,
                    // AssemblerClass: OrderAssembler,
                    update: { many: { disabled: true } },
                    create: { many: { disabled: true } },
                    delete: { disabled: true },
                },
            ],
        }),
    ],
    providers: [
        // listeners
        OrderListener,
    ],
})
export class OrderModule {}
