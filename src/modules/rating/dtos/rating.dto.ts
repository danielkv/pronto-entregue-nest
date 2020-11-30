import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

@ObjectType('Rating')
export class RatingDTO {
    @IsOptional()
    @IsInt()
    @FilterableField(() => ID)
    id?: number;

    @IsInt()
    @FilterableField(() => Int)
    rate: number;

    @IsString()
    @FilterableField()
    comment: string;

    @IsBoolean()
    @Field()
    hidden: boolean;

    @IsInt()
    @FilterableField(() => ID)
    companyId: number;

    @IsInt()
    @FilterableField(() => ID)
    orderId: number;

    @IsInt()
    @FilterableField(() => ID)
    userId: number;
}
