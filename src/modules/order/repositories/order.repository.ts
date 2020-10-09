import { RepositoryBase } from 'src/modules/common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { OrderFilterDTO } from '../dtos/order.filter.dto';
import { Order } from '../entities/order.entity';
import { IOrderRepository } from '../interfaces/order.repository.interface';

@EntityRepository(Order)
export class OrderRepository extends RepositoryBase<Order, OrderFilterDTO>
    implements IOrderRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('order');
    }
}
