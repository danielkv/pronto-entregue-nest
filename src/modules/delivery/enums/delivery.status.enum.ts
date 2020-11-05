import { registerEnumType } from '@nestjs/graphql';

export enum DeliveryStatusEnum {
    WAITING = 'waiting',
    WAITING_DELIVERY = 'waitingDelivery',
    DELIVERING = 'delivering',
    DELIVERED = 'delivered',
    CANCELED = 'canceled',
}

registerEnumType(DeliveryStatusEnum, { name: 'DeliveryStatusEnum' });
