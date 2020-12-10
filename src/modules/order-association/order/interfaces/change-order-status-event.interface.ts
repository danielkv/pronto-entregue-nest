import { IAuthContext } from 'src/modules/auth/interfaces/guard-roles.interface';
import { Order } from '../entities/order.entity';
import { OrderStatusEnum } from '../enums/order.status.enum';

export interface IChangeOrderStatusEvent {
    order: Order;
    status: OrderStatusEnum;
    authContext: IAuthContext;
}
