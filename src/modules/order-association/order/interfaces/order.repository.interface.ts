import { IRepositoryBase } from '../../../common/interfaces/repository.base.interface';
import { OrderFilterDTO } from '../dtos/order.filter.dto';
import { Order } from '../entities/order.entity';

export interface IOrderRepository extends IRepositoryBase<Order, OrderFilterDTO> {}
