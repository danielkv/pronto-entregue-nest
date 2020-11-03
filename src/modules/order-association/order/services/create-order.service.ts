import { Inject, Injectable } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { OrderDTO } from '../dtos/order.dto';
import { Order } from '../entities/order.entity';
import { ICreateOrderEvent } from '../interfaces/create-order-event.interface';
import { IOrderRepository } from '../interfaces/order.repository.interface';

@Injectable()
export class CreateOrderService {
    constructor(
        @Inject('IOrderRepository') private orderRepository: IOrderRepository,
        private eventEmitter: NestEventEmitter,
    ) {}

    async execute(order: OrderDTO): Promise<Order> {
        // create instance
        const orderInstance = this.orderRepository.create(order);

        // save
        const created = await this.orderRepository.save(orderInstance);

        // events
        const event: ICreateOrderEvent = {
            order: created,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('createOrder', event);

        // return
        return created;
    }
}
