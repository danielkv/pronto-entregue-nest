import { registerEnumType } from '@nestjs/graphql';

export enum DeliveryAreaTypeEnum {
    PE_DELIVERY = 'peDelivery',
    DELIVERY = 'delivery',
}

registerEnumType(DeliveryAreaTypeEnum, { name: 'DeliveryAreaTypeEnum' });
