import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IListEntity } from '../../common/interfaces/IListEntity';
import { PageInfo } from '../../common/types/page-info';
import { PickUpArea } from '../entities/pickup-area.entity';

@ObjectType('PickUpAreaList')
export class PickUpAreaListDTO implements IListEntity<PickUpArea> {
    @Field(() => [PickUpArea], { nullable: 'items' })
    items?: PickUpArea[];

    @Field(() => Int)
    countItems?: number;

    @Field(() => PageInfo, { nullable: true })
    pageInfo?: PageInfo;
}
