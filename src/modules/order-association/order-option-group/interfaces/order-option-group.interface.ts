import { IRepositoryBase } from '../../../common/interfaces/repository.base.interface';
import { OrderOptionGroupFilterDTO } from '../dtos/order-option-group.filter.dto';
import { OrderOptionGroup } from '../entities/order.option.group.entity';

export interface IOrderOptionGroupRepository extends IRepositoryBase<OrderOptionGroup, OrderOptionGroupFilterDTO> {}
