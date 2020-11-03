import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType('OrderOptionInput')
export class OrderOptionDTO {
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

    @IsNumber()
    @Field(() => Float)
    price: number;

    @IsInt()
    @Field()
    optionRelatedId: number;
}
