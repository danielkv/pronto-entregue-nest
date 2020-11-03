import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderOptionGroupDTO } from '../../order-option-group/dtos/order.option.group.dto';

@InputType('OrderProductInput')
export class OrderProductDTO {
    @IsOptional()
    @IsInt()
    @Field(() => Int)
    id?: number;

    @IsInt()
    @Field()
    quantity: number;

    @IsString()
    @Field()
    name: string;

    @IsNumber()
    @Field(() => Float)
    price: number;

    @IsString()
    @Field()
    message: string;

    @IsInt()
    @Field()
    orderId: number;

    @IsInt()
    @Field()
    productRelatedId: number;

    @ValidateNested({ each: true })
    @Type(() => OrderOptionGroupDTO)
    @Field(() => OrderOptionGroupDTO)
    orderOptionGroups: OrderOptionGroupDTO[];
}
