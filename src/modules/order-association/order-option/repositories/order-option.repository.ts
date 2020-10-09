import { RepositoryProviderFactory } from 'src/modules/common/helpers/repository-provider.factory';
import { RepositoryBase } from 'src/modules/common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { OrderOption } from '../entities/order.option.entity';
import { IOrderOptionRepository } from '../interfaces/order-option.repository';

@EntityRepository(OrderOption)
export class OrderOptionRepository extends RepositoryBase<OrderOption>
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
