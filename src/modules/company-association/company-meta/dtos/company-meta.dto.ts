import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType('CompanyMetaInput')
export class CompanyMetaDTO {
    @IsInt()
    @Field(() => ID, { nullable: true })
    id?: number;

    @IsString()
    @FilterableField()
    key: string;

    @IsString()
    @Field()
    value: string;

    @IsInt()
    @Field()
    companyId: number;
}
