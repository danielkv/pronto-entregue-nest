import { registerEnumType } from '@nestjs/graphql';

export enum ProductTypeEnum {
    INLINE = 'inline',
    PANEL = 'panel',
}

registerEnumType(ProductTypeEnum, { name: 'ProductTypeEnum' });
