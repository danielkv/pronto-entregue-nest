import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { NestEventEmitter } from 'nest-event';
import { OrderDTO } from '../dtos/order.dto';
import { OrderRepository } from '../repositories/order.repository';
import { OrderEventEmitterService } from './event-emitter.service';

@QueryService(OrderDTO)
export class OrderService extends OrderEventEmitterService<OrderDTO> {
    constructor(
        @InjectQueryService(OrderRepository) service: QueryService<OrderDTO>,
        protected eventEmitter: NestEventEmitter,
        protected orderRepotitory: OrderRepository,
    ) {
        // provide the logger name and the service
        super(service, eventEmitter, orderRepotitory);
    }
}
