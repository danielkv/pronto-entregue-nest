import { IAuthContext } from 'src/modules/auth/interfaces/guard-roles.interface';
import { Delivery } from '../entities/delivery.entity';
import { DeliveryStatusEnum } from '../enums/delivery.status.enum';

export interface IChangeDeliveryStatusEvent {
    delivery: Delivery;
    status: DeliveryStatusEnum;
    authContext: IAuthContext;
}
