import { IRepositoryListOptions } from 'src/modules/common/interfaces/IRepositoryListOptions';
import { DeliveryFilterDTO } from '../dtos/delivery.filter.dto';
import { Delivery } from '../entities/delivery.entity';

export interface IDeliveryListOptions extends IRepositoryListOptions<Delivery, DeliveryFilterDTO> {}
