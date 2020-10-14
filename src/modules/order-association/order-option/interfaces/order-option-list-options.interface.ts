import { IRepositoryListOptions } from 'src/modules/common/interfaces/IRepositoryListOptions';
import { OrderOptionFilterDTO } from '../dtos/order-option.filter.dto';
import { OrderOption } from '../entities/order.option.entity';

export interface IOrderOptionListOptions extends IRepositoryListOptions<OrderOption, OrderOptionFilterDTO> {}
