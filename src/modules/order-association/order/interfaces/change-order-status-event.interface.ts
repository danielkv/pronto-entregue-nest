import { Order } from '../entities/order.entity';
import { OrderStatusEnum } from '../enums/order.status.enum';

export interface IChangeOrderStatusEvent {
    order: Order;
    status: OrderStatusEnum;
}
