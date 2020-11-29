import { registerEnumType } from '@nestjs/graphql';
import { DeliveryAreaTypeEnum } from 'src/modules/delivery-area/enums/delivery-area-type.enum';
import { PickUpAreaTypeEnum } from 'src/modules/pickup/enums/pickup-area-type.enum';

export const OrderTypeEnum = {
    ...PickUpAreaTypeEnum,
    ...DeliveryAreaTypeEnum,
};

registerEnumType(OrderTypeEnum, { name: 'OrderTypeEnum' });
