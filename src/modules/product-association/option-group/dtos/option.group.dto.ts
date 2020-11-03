import { Field, InputType, Int } from '@nestjs/graphql';
import { OptionGroupTypeEnum } from '../enums/option-group-type.enum';
import { OptionGroupPriceTypeEnum } from '../enums/option-group-price-type.enum';
import { IsBoolean, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { OptionDTO } from '../../option/dtos/option.dto';
import { Type } from 'class-transformer';

@InputType('OptionGroupInput')
export class OptionGroupDTO {
    @IsOptional()
    @IsInt()
    @Field(() => Int, { nullable: true })
    id?: number;

    @IsString()
    @Field()
    name: string;

    @IsString()
    @Field(() => OptionGroupTypeEnum)
    type: OptionGroupTypeEnum;

    @IsString()
    @Field(() => OptionGroupPriceTypeEnum)
    priceType: OptionGroupPriceTypeEnum;

    @IsInt()
    @Field(() => Int)
    order: number;

    @IsInt()
    @Field(() => Int)
    minSelect: number;

    @IsInt()
    @Field(() => Int)
    maxSelect: number;

    @IsBoolean()
    @Field()
    active: boolean;

    @IsBoolean()
    @Field()
    removed: boolean;

    @IsInt()
    @Field(() => Int)
    maxSelectRestrain: number;

    @ValidateNested({ each: true })
    @Type(() => OptionDTO)
    @Field(() => [OptionDTO])
    options: OptionDTO[];
}
