import { RepositoryProviderFactory } from 'src/modules/common/helpers/repository-provider.factory';
import { RepositoryBase } from 'src/modules/common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { OrderOptionGroup } from '../entities/order.option.group.entity';
import { IOrderOptionGroupRepository } from '../interfaces/order-option-group.interface';

@EntityRepository(OrderOptionGroup)
export class OrderOptionGroupRepository extends RepositoryBase<OrderOptionGroup>
    implements IOrderOptionGroupRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('orderOptionGroup');
    }
}

export const OrderOptionGroupRepositoryProvider = new RepositoryProviderFactory(
    'IOrderOptionGroupRepository',
    OrderOptionGroupRepository,
).create();
