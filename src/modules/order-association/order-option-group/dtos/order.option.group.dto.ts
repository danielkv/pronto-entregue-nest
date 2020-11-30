import { Field, ID, ObjectType } from '@nestjs/graphql';
import { OrderOptionGroupPriceType } from '../enums/order-option-group-price-type.enum';
import { IsInt, IsOptional, IsString } from 'class-validator';

import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('OrderOptionGroup')
export class OrderOptionGroupDTO {
    @IsOptional()
    @IsInt()
    @FilterableField(() => ID)
    id?: number;

    @IsString()
    @FilterableField()
    name: string;

    @IsString()
    @Field(() => OrderOptionGroupPriceType)
    priceType: OrderOptionGroupPriceType;

    /*  @IsInt()
    @FilterableField()
    optionsGroupRelatedId: number; */

    /*  @ValidateNested({ each: true })
    @Type(() => OrderOptionDTO)
    @Field(() => [OrderOptionDTO])
    orderOptions: OrderOptionDTO[]; */
}
