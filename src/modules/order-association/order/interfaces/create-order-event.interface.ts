import { Order } from '../entities/order.entity';

export interface ICreateOrderEvent {
    order: Order;
}
