import { registerEnumType } from '@nestjs/graphql';

export enum OptionGroupPriceTypeEnum {
    HIGHER = 'higher',
    SUM = 'sum',
}

registerEnumType(OptionGroupPriceTypeEnum, { name: 'OptionGroupPriceType' });
