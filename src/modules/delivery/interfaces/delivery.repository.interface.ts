import { IRepositoryBase } from 'src/modules/common/interfaces/repository.base.interface';
import { DeliveryFilterDTO } from '../dtos/delivery.filter.dto';
import { Delivery } from '../entities/delivery.entity';

export interface IDeliveryRepository extends IRepositoryBase<Delivery, DeliveryFilterDTO> {}
