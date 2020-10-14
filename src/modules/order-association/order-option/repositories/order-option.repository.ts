import { RepositoryProviderFactory } from '../../../common/helpers/repository-provider.factory';
import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { OrderOption } from '../entities/order.option.entity';
import { IOrderOptionRepository } from '../interfaces/order-option.repository';
import { OrderOptionFilterDTO } from '../dtos/order-option.filter.dto';

@EntityRepository(OrderOption)
export class OrderOptionRepository extends RepositoryBase<OrderOption, OrderOptionFilterDTO>
    implements IOrderOptionRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('orderOption');
    }
}

export const OrderOptionRepositoryProvider = new RepositoryProviderFactory(
    'IOrderOptionRepository',
    OrderOptionRepository,
).create();
