import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { ProductTypeEnum } from '../enums/product-type.enum';
import { IsBoolean, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { OptionGroupDTO } from '../../option-group/dtos/option.group.dto';
import { FilterableField, FilterableRelation, Relation } from '@nestjs-query/query-graphql';
import { SortDirection } from '@nestjs-query/core';
import { Sale } from '../../sale/entities/sale.entity';

@ObjectType('Product')
@FilterableRelation('optionsGroups', () => OptionGroupDTO, {
    defaultFilter: { removed: { isNot: true }, active: { is: true } },
    defaultSort: [{ field: 'order', direction: SortDirection.DESC }],
})
@Relation('sale', () => Sale)
export class ProductDTO {
    @IsOptional()
    @IsInt()
    @FilterableField(() => Int)
    id?: number;

    @IsString()
    @FilterableField()
    name: string;

    @IsString()
    @FilterableField()
    description: string;

    @IsString()
    @FilterableField()
    sku: string;

    @IsString()
    @Field()
    image: string;

    @IsBoolean()
    @FilterableField()
    active: boolean;

    @IsInt()
    @FilterableField()
    order: number;

    @IsString()
    @Field(() => ProductTypeEnum)
    type: ProductTypeEnum;

    @IsNumber()
    @Field(() => Float)
    fromPrice: number;

    @IsNumber()
    @FilterableField(() => Float)
    price: number;

    @IsInt()
    @FilterableField(() => Int)
    categoryId: number;

    @IsInt()
    @FilterableField(() => Int)
    companyId: number;

    @IsInt()
    @Field(() => Int, { nullable: true })
    minDeliveryTime?: number;

    @IsBoolean()
    @Field()
    scheduleEnabled: boolean;
}
