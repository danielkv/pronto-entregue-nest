import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { OrderDTO } from '../dtos/order.dto';
import { Order } from '../entities/order.entity';
import { IOrderRepository } from '../interfaces/order.repository.interface';
import { IUpdateOrderEvent } from '../interfaces/update-order-event.interface';

@Injectable()
export class UpdateOrderService {
    constructor(
        @Inject('IOrderRepository') private orderRepository: IOrderRepository,
        private eventEmitter: NestEventEmitter,
    ) {}

    async execute(orderId: Order['id'], order: OrderDTO): Promise<Order> {
        // check if order exists
        const oldOrder = await this.orderRepository.get(orderId);
        if (!oldOrder) throw new NotFoundException('Pedido não existe');

        // merge new data
        const mergedOrder = this.orderRepository.merge(oldOrder, order);

        // save
        const updated = await this.orderRepository.save(mergedOrder);

        // events
        const event: IUpdateOrderEvent = {
            order: updated,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('updateOrder', event);

        // return
        return updated;
    }
}
