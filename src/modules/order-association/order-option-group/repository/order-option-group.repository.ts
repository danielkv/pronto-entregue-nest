import { RepositoryProviderFactory } from '../../../common/helpers/repository-provider.factory';
import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { OrderOptionGroup } from '../entities/order.option.group.entity';
import { IOrderOptionGroupRepository } from '../interfaces/order-option-group.interface';
import { OrderOptionGroupFilterDTO } from '../dtos/order-option-group.filter.dto';

@EntityRepository(OrderOptionGroup)
export class OrderOptionGroupRepository extends RepositoryBase<OrderOptionGroup, OrderOptionGroupFilterDTO>
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
