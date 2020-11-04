import { IRepositoryBase } from '../../../common/interfaces/repository.base.interface';
import { OrderFilterDTO } from '../dtos/order.filter.dto';
import { Order } from '../entities/order.entity';
import { OrderStatusEnum } from '../enums/order.status.enum';

export interface IOrderRepository extends IRepositoryBase<Order, OrderFilterDTO> {
    changeStatus(orderId: Order['id'], newStatus: OrderStatusEnum): Promise<any>;
}
