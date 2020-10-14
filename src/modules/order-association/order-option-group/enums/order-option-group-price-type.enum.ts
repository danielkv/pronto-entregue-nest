import { registerEnumType } from '@nestjs/graphql';

export enum OrderOptionGroupPriceType {
    HIGHER = 'higher',
    SUM = 'sum',
}

registerEnumType(OrderOptionGroupPriceType, {
    name: 'OrderOptionGroupPriceType',
});
