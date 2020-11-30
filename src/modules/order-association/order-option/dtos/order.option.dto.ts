import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

@ObjectType('OrderOption')
export class OrderOptionDTO {
    @IsOptional()
    @IsInt()
    @FilterableField(() => ID)
    id?: number;

    @IsString()
    @FilterableField()
    name: string;

    @IsString()
    @FilterableField()
    description: string;

    @IsNumber()
    @Field(() => Float)
    price: number;

    @IsInt()
    @FilterableField(() => ID)
    optionRelatedId: number;
}
