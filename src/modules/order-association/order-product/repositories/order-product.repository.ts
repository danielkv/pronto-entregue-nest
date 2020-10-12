import { RepositoryProviderFactory } from '../../../common/helpers/repository-provider.factory';
import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { OrderProduct } from '../../order/interfaces/order.product.entity';
import { IOrderProductRepository } from '../interfaces/order-product.repository.interface';
import { OrderProductFilterDTO } from '../dtos/order-product.filter.dto';

@EntityRepository(OrderProduct)
export class OrderProductRepository extends RepositoryBase<OrderProduct, OrderProductFilterDTO>
    implements IOrderProductRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('orderProduct');
    }
}

export const OrderProductRepositoryProvider = new RepositoryProviderFactory(
    'IOrderProductRepository',
    OrderProductRepository,
).create();
