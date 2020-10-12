import { Inject, Injectable } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { IOrderRepository } from '../interfaces/order.repository.interface';

@Injectable()
export class GetOrderService {
    constructor(@Inject('IOrderRepository') private orderRepository: IOrderRepository) {}

    execute(orderId: number): Promise<Order>;
    execute(orderId: number[]): Promise<Order[]>;
    execute(orderId: any): Promise<Order | Order[]> {
        return this.orderRepository.get(orderId);
    }
}
