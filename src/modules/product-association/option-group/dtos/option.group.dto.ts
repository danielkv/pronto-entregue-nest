import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { OptionGroupTypeEnum } from '../enums/option-group-type.enum';
import { OptionGroupPriceTypeEnum } from '../enums/option-group-price-type.enum';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { OptionDTO } from '../../option/dtos/option.dto';
import { FilterableField, FilterableRelation } from '@nestjs-query/query-graphql';

@ObjectType('OptionGroup')
@FilterableRelation('options', () => OptionDTO)
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
    @FilterableField(() => Int, { allowedComparisons: [] })
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
