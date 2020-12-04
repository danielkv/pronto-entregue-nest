import { DeepPartial, InjectAssemblerQueryService, QueryService } from '@nestjs-query/core';
import { NestEventEmitter } from 'nest-event';

import { Order } from '../entities/order.entity';
import { EventEmitterService } from '../../../common/services/event-emitter.service';
import { OrderAssembler } from '../assemblers/order.assembler';
import { OrderInputDTO } from '../dtos/order-input.dto';

@QueryService(Order)
export class OrderService extends EventEmitterService<Order, DeepPartial<OrderInputDTO>, DeepPartial<OrderInputDTO>> {
    constructor(
        @InjectAssemblerQueryService(OrderAssembler) readonly service: QueryService<Order>,
        protected eventEmitter: NestEventEmitter,
    ) {
        // provide the logger name and the service
        super(service, eventEmitter, { createEvent: 'createOrder', updateEvent: 'updateOrder' });
    }
}
