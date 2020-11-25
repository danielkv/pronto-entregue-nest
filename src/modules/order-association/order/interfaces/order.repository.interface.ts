import { IRepositoryBase } from '../../../common/interfaces/repository.base.interface';
import { Order } from '../entities/order.entity';
import { OrderStatusEnum } from '../enums/order.status.enum';

export interface IOrderRepository extends IRepositoryBase<Order> {
    changeStatus(orderId: Order['id'], newStatus: OrderStatusEnum): Promise<any>;
}
