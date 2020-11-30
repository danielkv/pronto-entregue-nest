import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { OrderOptionGroup } from '../entities/order.option.group.entity';

@EntityRepository(OrderOptionGroup)
export class OrderOptionGroupRepository extends RepositoryBase<OrderOptionGroup> {}
