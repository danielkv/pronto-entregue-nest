import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsString } from 'class-validator';

@ObjectType('Category')
export class CategoryDTO {
    @IsInt()
    @FilterableField(() => Int, { nullable: true })
    id?: number;

    @IsString()
    @FilterableField()
    name: string;

    @IsString()
    @Field({ nullable: true })
    image?: string;

    @IsString()
    @FilterableField({ nullable: true })
    description?: string;

    @FilterableField()
    companyId?: string;

    @IsBoolean()
    @FilterableField()
    active: boolean;

    @IsInt()
    @Field(() => Int)
    order: number;
}
