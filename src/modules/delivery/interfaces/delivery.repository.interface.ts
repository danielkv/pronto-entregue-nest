import { User } from 'src/modules/user-association/user/entities/user.entity';
import { IRepositoryBase } from '../../common/interfaces/repository.base.interface';
import { DeliveryFilterDTO } from '../dtos/delivery.filter.dto';
import { Delivery } from '../entities/delivery.entity';
import { DeliveryStatusEnum } from '../enums/delivery.status.enum';

export interface IDeliveryRepository extends IRepositoryBase<Delivery, DeliveryFilterDTO> {
    setDeliveryMan(deliveryId: Delivery['id'], userId: User['id']): Promise<any>;

    changeStatus(deliveryId: Delivery['id'], newStatus: DeliveryStatusEnum): Promise<any>;
}
