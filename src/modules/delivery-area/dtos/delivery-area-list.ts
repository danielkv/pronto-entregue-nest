import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IListEntity } from '../../common/interfaces/IListEntity';
import { PageInfo } from '../../common/types/page-info';
import { DeliveryArea } from '../entities/delivery.area.entity';

@ObjectType()
export class DeliveryAreaList implements IListEntity<DeliveryArea> {
    @Field(() => [DeliveryArea], { nullable: 'items' })
    items?: DeliveryArea[];

    @Field(() => Int)
    countItems?: number;

    @Field(() => PageInfo, { nullable: true })
    pageInfo?: PageInfo;
}
