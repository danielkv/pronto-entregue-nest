import { IRepositoryBase } from '../../../common/interfaces/repository.base.interface';
import { OrderProduct } from '../../order/interfaces/order.product.entity';

export interface IOrderProductRepository extends IRepositoryBase<OrderProduct> {}
