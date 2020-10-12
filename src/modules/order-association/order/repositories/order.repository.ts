import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { OrderFilterDTO } from '../dtos/order.filter.dto';
import { Order } from '../entities/order.entity';
import { IOrderRepository } from '../interfaces/order.repository.interface';
import { RepositoryProviderFactory } from 'src/modules/common/helpers/repository-provider.factory';

@EntityRepository(Order)
export class OrderRepository extends RepositoryBase<Order, OrderFilterDTO> implements IOrderRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('order');
    }
}

export const OrderRepositoryProvider = new RepositoryProviderFactory('IOrderRepository', OrderRepository).create();
