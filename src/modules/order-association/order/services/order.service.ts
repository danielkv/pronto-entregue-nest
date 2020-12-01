import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { NestEventEmitter } from 'nest-event';

import { Order } from '../entities/order.entity';
import { OrderRepository } from '../repositories/order.repository';
import { EventEmitterService } from '../../../common/services/event-emitter.service';

@QueryService(Order)
export class OrderService extends EventEmitterService<Order> {
    constructor(
        @InjectQueryService(OrderRepository) service: QueryService<Order>,
        protected eventEmitter: NestEventEmitter,
    ) {
        // provide the logger name and the service
        super(service, eventEmitter, { createEvent: 'createOrder', updateEvent: 'updateOrder' });
    }
}
