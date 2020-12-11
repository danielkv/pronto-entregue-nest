import { User } from 'src/modules/user-association/user/entities/user.entity';
import { Delivery } from '../entities/delivery.entity';

export interface ISetDeliveryManEvent {
    delivery: Delivery;
    user: User;
}
