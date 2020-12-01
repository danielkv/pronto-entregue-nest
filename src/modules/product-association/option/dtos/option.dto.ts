import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

@ObjectType('Option')
export class OptionDTO {
    @IsOptional()
    @IsInt()
    @FilterableField(() => Int, { nullable: true })
    id?: number;

    @IsString()
    @FilterableField()
    name: string;

    @IsString()
    @FilterableField()
    description: string;

    @IsInt()
    @FilterableField(() => Int)
    order: number;

    @IsInt()
    @Field(() => Int)
    maxSelectRestrainOther: number;

    @IsBoolean()
    @FilterableField()
    active: boolean;

    @IsBoolean()
    @FilterableField()
    removed: boolean;

    @IsNumber()
    @Field(() => Float)
    price: number;
}
