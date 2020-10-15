import { registerEnumType } from '@nestjs/graphql';

export enum OptionGroupTypeEnum {
    SINGLE = 'single',
    MULTI = 'multi',
}

registerEnumType(OptionGroupTypeEnum, { name: 'OptionGroupType' });
