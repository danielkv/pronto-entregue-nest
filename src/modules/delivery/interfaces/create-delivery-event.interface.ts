import { Delivery } from '../entities/delivery.entity';

export interface ICreateDeliveryEvent {
    delivery: Delivery;
}
