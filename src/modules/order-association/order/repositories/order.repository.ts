import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderStatusEnum } from '../enums/order.status.enum';

@EntityRepository(Order)
export class OrderRepository extends RepositoryBase<Order> {
    changeStatus(orderId: Order['id'], newStatus: OrderStatusEnum): Promise<any> {
        const query = this.createQueryBuilder('order');

        query
            .update()
            .set({ status: newStatus })
            .whereInIds(orderId);

        return query.execute();
    }
}
