import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IListEntity } from '../../../common/interfaces/IListEntity';
import { PageInfo } from '../../../common/types/page-info';
import { Order } from '../entities/order.entity';

@ObjectType('OrderList')
export class OrdersListDTO implements IListEntity<Order> {
    @Field(() => [Order], { nullable: 'items' })
    items?: Order[];

    @Field(() => Int)
    countItems?: number;

    @Field(() => PageInfo, { nullable: true })
    pageInfo?: PageInfo;
}
