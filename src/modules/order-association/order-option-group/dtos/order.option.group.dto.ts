import { Field, InputType, Int } from '@nestjs/graphql';
import { OrderOptionGroupPriceType } from '../enums/order-option-group-price-type.enum';
import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderOptionDTO } from '../../order-option/dtos/order.option.dto';

@InputType('OrderOptionGroupInput')
export class OrderOptionGroupDTO {
    @IsOptional()
    @IsInt()
    @Field(() => Int)
    id?: number;

    @IsString()
    @Field()
    name: string;

    @IsString()
    @Field(() => OrderOptionGroupPriceType)
    priceType: OrderOptionGroupPriceType;

    @IsInt()
    @Field()
    orderProductId: number;

    @IsInt()
    @Field()
    optionsGroupRelatedId: number;

    @ValidateNested({ each: true })
    @Type(() => OrderOptionDTO)
    @Field(() => [OrderOptionDTO])
    orderOptions: OrderOptionDTO[];
}
