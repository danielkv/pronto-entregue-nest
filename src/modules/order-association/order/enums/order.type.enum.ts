import { registerEnumType } from '@nestjs/graphql';

export enum OrderTypeEnum {
    PICK_UP = 'takeout',
    DELIVERY = 'delivery',
    PE_DELIVERY = 'peDelivery',
}

registerEnumType(OrderTypeEnum, { name: 'OrderTypeEnum' });
