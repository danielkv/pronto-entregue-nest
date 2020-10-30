import { registerEnumType } from '@nestjs/graphql';

export enum CouponValueType {
    VALUE = 'value',
    PERCENTAGE = 'percentage',
}

registerEnumType(CouponValueType, { name: 'CouponValueType' });
