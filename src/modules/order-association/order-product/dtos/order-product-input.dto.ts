import { Field, Float, ID, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNumber, IsString } from 'class-validator';
import { OrderOptionGroupInputDTO } from '../../order-option-group/dtos/order-option-group-input.dto';

@InputType('OrderProductInput')
export class OrderProductInputDTO {
    @Field(() => Int, { nullable: true })
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

    @Field(() => ID)
    productRelatedId: number;

    @Field(() => [OrderOptionGroupInputDTO], { nullable: 'items' })
    optionsGroups: OrderOptionGroupInputDTO[];
}
