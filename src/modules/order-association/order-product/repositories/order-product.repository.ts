import { RepositoryProviderFactory } from 'src/modules/common/helpers/repository-provider.factory';
import { RepositoryBase } from 'src/modules/common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { OrderProduct } from '../../order/interfaces/order.product.entity';
import { IOrderProductRepository } from '../interfaces/order-product.repository.interface';

@EntityRepository(OrderProduct)
export class OrderProductRepository extends RepositoryBase<OrderProduct>
    implements IOrderProductRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('orderProduct');
    }
}

export const OrderProductRepositoryProvider = new RepositoryProviderFactory(
    'OrderProductRepository',
    OrderProductRepository,
).create();
