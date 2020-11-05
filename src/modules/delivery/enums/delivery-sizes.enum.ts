import { registerEnumType } from '@nestjs/graphql';

export enum DeliverySizesEnum {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
}

registerEnumType(DeliverySizesEnum, { name: 'DeliverySizesEnum' });
