import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatusEnum {
    WAITING = 'waiting',
    SCHEDULED = 'scheduled',
    PREPARING = 'preparing',
    WAITING_PICK_UP = 'waitingPickUp',
    WAITING_DELIVERY = 'waitingDelivery',
    DELIVERING = 'delivering',
    DELIVERED = 'delivered',
    CANCELED = 'canceled',
}

registerEnumType(OrderStatusEnum, { name: 'OrderStatusEnum' });
