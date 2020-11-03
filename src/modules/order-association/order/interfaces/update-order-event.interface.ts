import { Order } from '../entities/order.entity';

export interface IUpdateOrderEvent {
    order: Order;
}
