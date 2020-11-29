import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsString } from 'class-validator';

@InputType('CategoryInput')
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
