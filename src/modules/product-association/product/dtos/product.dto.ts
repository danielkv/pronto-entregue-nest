import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { ProductTypeEnum } from '../enums/product-type.enum';
import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { OptionGroupDTO } from '../../option-group/dtos/option.group.dto';
import { Type } from 'class-transformer';

@InputType('ProductInput')
export class Product {
    @IsOptional()
    @IsInt()
    @Field(() => Int)
    id?: number;

    @IsString()
    @Field()
    name: string;

    @IsString()
    @Field()
    description: string;

    @IsString()
    @Field()
    sku: string;

    @IsString()
    @Field()
    image: string;

    @IsBoolean()
    @Field()
    active: boolean;

    @IsBoolean()
    @Field()
    listed: boolean;

    @IsInt()
    @Field(() => Int)
    order: number;

    @IsString()
    @Field(() => ProductTypeEnum)
    type: ProductTypeEnum;

    @IsNumber()
    @Field(() => Float)
    fromPrice: number;

    @IsNumber()
    @Field(() => Float)
    price: number;

    @IsInt()
    @Field(() => Int)
    categoryId: number;

    @IsInt()
    @Field(() => Int)
    companyId: number;

    @IsInt()
    @Field(() => Int, { nullable: true })
    minDeliveryTime?: number;

    @IsBoolean()
    @Field()
    scheduleEnabled: boolean;

    @ValidateNested({ each: true })
    @Type(() => OptionGroupDTO)
    @Field(() => [OptionGroupDTO])
    optionsGroups: OptionGroupDTO[];
}
