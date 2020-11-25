import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@ObjectType('CompanyMeta')
export class CompanyMetaDTO {
    @IsInt()
    @Field(() => ID, { nullable: true })
    id?: number;

    @IsString()
    @FilterableField()
    key: string;

    @IsString()
    @FilterableField()
    value: string;

    @IsInt()
    @FilterableField()
    companyId: number;
}
