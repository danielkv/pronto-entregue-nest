import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { OrderOption } from '../entities/order.option.entity';

@EntityRepository(OrderOption)
export class OrderOptionRepository extends RepositoryBase<OrderOption> {}
