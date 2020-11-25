import { registerEnumType } from '@nestjs/graphql';

export enum PaymentMethodFeeTypeEnum {
    VALUE = 'value',
    PERCENTAGE = 'pct',
}

registerEnumType(PaymentMethodFeeTypeEnum, { name: 'PaymentMethodFeeTypeEnum' });
