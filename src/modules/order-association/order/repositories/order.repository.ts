import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { OrderFilterDTO } from '../dtos/order.filter.dto';
import { Order } from '../entities/order.entity';
import { IOrderRepository } from '../interfaces/order.repository.interface';
import { RepositoryProviderFactory } from 'src/modules/common/helpers/repository-provider.factory';
import { OrderStatusEnum } from '../enums/order.status.enum';

@EntityRepository(Order)
export class OrderRepository extends RepositoryBase<Order, OrderFilterDTO> implements IOrderRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('order');
    }

    changeStatus(orderId: Order['id'], newStatus: OrderStatusEnum): Promise<any> {
        const query = this.createQueryBuilder(this.tablename);

        query
            .update()
            .set({ status: newStatus })
            .whereInIds(orderId);

        return query.execute();
    }
}

export const OrderRepositoryProvider = new RepositoryProviderFactory('IOrderRepository', OrderRepository).create();
