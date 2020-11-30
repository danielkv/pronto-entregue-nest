import { Field, ID, ObjectType } from '@nestjs/graphql';
import { OrderOptionGroupPriceType } from '../enums/order-option-group-price-type.enum';
import { IsInt, IsOptional, IsString } from 'class-validator';

import { FilterableField, FilterableRelation, Relation } from '@nestjs-query/query-graphql';
import { OrderOptionDTO } from '../../order-option/dtos/order.option.dto';
import { OptionGroupDTO } from 'src/modules/product-association/option-group/dtos/option.group.dto';

@ObjectType('OrderOptionGroup')
@FilterableRelation('options', () => [OrderOptionDTO])
@Relation('relatedOptionGroup', () => OptionGroupDTO)
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
