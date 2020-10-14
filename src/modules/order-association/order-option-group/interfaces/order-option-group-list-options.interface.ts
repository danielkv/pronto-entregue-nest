import { IRepositoryListOptions } from 'src/modules/common/interfaces/IRepositoryListOptions';
import { OrderOptionGroupFilterDTO } from '../dtos/order-option-group.filter.dto';
import { OrderOptionGroup } from '../entities/order.option.group.entity';

export interface IOrderOptionGroupListOptions
    extends IRepositoryListOptions<OrderOptionGroup, OrderOptionGroupFilterDTO> {}
