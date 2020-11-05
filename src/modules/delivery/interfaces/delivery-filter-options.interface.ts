import { IRepositoryFiltersOptions } from 'src/modules/common/interfaces/IRepositoryFiltersOptions';
import { DeliveryFilterDTO } from '../dtos/delivery.filter.dto';
import { Delivery } from '../entities/delivery.entity';

export interface IDeliveryFilterOptions extends IRepositoryFiltersOptions<Delivery, DeliveryFilterDTO> {}
