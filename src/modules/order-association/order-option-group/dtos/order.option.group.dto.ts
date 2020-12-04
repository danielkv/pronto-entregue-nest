import { Field, ID, ObjectType } from '@nestjs/graphql';
import { OrderOptionGroupPriceType } from '../enums/order-option-group-price-type.enum';
import { IsInt, IsOptional, IsString } from 'class-validator';

import { FilterableField, Relation } from '@nestjs-query/query-graphql';
import { OrderOptionDTO } from '../../order-option/dtos/order.option.dto';
import { OptionGroupDTO } from 'src/modules/product-association/option-group/dtos/option.group.dto';

@ObjectType('OrderOptionGroup')
@Relation('options', () => [OrderOptionDTO])
@Relation('optionGroupRelated', () => OptionGroupDTO)
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
}
