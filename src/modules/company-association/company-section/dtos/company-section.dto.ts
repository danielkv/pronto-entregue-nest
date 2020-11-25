import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsString } from 'class-validator';

@ObjectType('CompanySection')
export class CompanySectionDTO {
    @IsInt()
    @FilterableField(() => ID, { nullable: true })
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

    @IsBoolean()
    @FilterableField()
    active: boolean;
}
