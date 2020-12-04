import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { OptionGroupTypeEnum } from '../enums/option-group-type.enum';
import { OptionGroupPriceTypeEnum } from '../enums/option-group-price-type.enum';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { OptionDTO } from '../../option/dtos/option.dto';
import { FilterableField, FilterableRelation, Relation } from '@nestjs-query/query-graphql';
import { SortDirection } from '@nestjs-query/core';

@ObjectType('OptionGroup')
@FilterableRelation('options', () => OptionDTO, {
    defaultFilter: { removed: { isNot: true }, active: { is: true } },
    defaultSort: [{ field: 'order', direction: SortDirection.DESC }],
})
@Relation('restrainedBy', () => OptionGroupDTO)
@Relation('groupRestrained', () => OptionGroupDTO)
export class OptionGroupDTO {
    @IsOptional()
    @IsInt()
    @FilterableField(() => ID, { nullable: true })
    id?: number;

    @IsString()
    @FilterableField()
    name: string;

    @IsString()
    @Field(() => OptionGroupTypeEnum)
    type: OptionGroupTypeEnum;

    @IsString()
    @Field(() => OptionGroupPriceTypeEnum)
    priceType: OptionGroupPriceTypeEnum;

    @IsInt()
    @FilterableField(() => Int)
    order: number;

    @IsInt()
    @Field(() => Int)
    minSelect: number;

    @IsInt()
    @Field(() => Int)
    maxSelect: number;

    @Field()
    createdAt: Date;

    @IsBoolean()
    @FilterableField()
    active: boolean;

    @IsBoolean()
    @FilterableField()
    removed: boolean;

    @IsInt()
    @Field(() => Int)
    maxSelectRestrain: number;
}
