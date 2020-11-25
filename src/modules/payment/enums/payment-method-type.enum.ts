import { registerEnumType } from '@nestjs/graphql';

export enum PaymentMethodTypeEnum {
    MONEY = 'money',
    DELIVERY = 'delivery',
    ONLINE = 'app',
}

registerEnumType(PaymentMethodTypeEnum, { name: 'PaymentMethodTypeEnum' });
