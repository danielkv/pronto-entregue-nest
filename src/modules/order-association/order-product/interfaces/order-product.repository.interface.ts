import { IRepositoryBase } from '../../../common/interfaces/repository.base.interface';
import { OrderProduct } from '../../order/interfaces/order.product.entity';
import { OrderProductFilterDTO } from '../dtos/order-product.filter.dto';

export interface IOrderProductRepository extends IRepositoryBase<OrderProduct, OrderProductFilterDTO> {}
