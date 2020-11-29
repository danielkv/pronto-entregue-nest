import { registerEnumType } from '@nestjs/graphql';

export enum PickUpAreaTypeEnum {
    PICK_UP = 'takeout',
}

registerEnumType(PickUpAreaTypeEnum, { name: 'PickUpAreaTypeEnum' });
