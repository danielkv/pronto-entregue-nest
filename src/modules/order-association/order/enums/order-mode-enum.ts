import { registerEnumType } from '@nestjs/graphql';

export enum OrderModeEnum {
    SIMPLE = 'simple',
    RESERVED = 'reserved',
    SCHEDULED = 'scheduled',
}

registerEnumType(OrderModeEnum, { name: 'OrderModeEnum' });
