import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('OrderProduct')
export class OrderProductDTO {
    @IsOptional()
    @IsInt()
    @FilterableField(() => Int)
    id?: number;

    @IsInt()
    @FilterableField()
    quantity: number;

    @IsString()
    @FilterableField()
    name: string;

    @IsNumber()
    @Field(() => Float)
    price: number;

    @IsString()
    @FilterableField()
    message: string;

    /*  @IsInt()
    @Field()
    orderId: number; */

    /*  @IsInt()
    @Field()
    productRelatedId: number;
 */
    /* @ValidateNested({ each: true })
    @Type(() => OrderOptionGroupDTO)
    @Field(() => OrderOptionGroupDTO)
    orderOptionGroups: OrderOptionGroupDTO[]; */
}
