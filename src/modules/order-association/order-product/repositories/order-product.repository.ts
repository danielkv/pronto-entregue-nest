import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { OrderProduct } from '../entities/order.product.entity';

@EntityRepository(OrderProduct)
export class OrderProductRepository extends RepositoryBase<OrderProduct> {}
