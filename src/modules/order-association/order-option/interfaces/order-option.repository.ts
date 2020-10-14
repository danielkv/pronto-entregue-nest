import { IRepositoryBase } from '../../../common/interfaces/repository.base.interface';
import { OrderOptionFilterDTO } from '../dtos/order-option.filter.dto';
import { OrderOption } from '../entities/order.option.entity';

export interface IOrderOptionRepository extends IRepositoryBase<OrderOption, OrderOptionFilterDTO> {}
