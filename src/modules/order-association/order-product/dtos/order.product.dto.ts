import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

import { FilterableField, FilterableRelation, Relation } from '@nestjs-query/query-graphql';
import { OrderOptionGroupDTO } from '../../order-option-group/dtos/order.option.group.dto';
import { ProductDTO } from 'src/modules/product-association/product/dtos/product.dto';

@ObjectType('OrderProduct')
@FilterableRelation('optionsGroups', () => [OrderOptionGroupDTO])
@Relation('relatedProduct', () => ProductDTO)
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
}
