import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PageInfo } from '../../graphql/types/page-info';
import { Company } from '../entities/company.entity';

@ObjectType()
export class ListCompanies {
    @Field(() => [Company])
    items: Company[];

    @Field(() => Int)
    countItems: number;

    @Field(() => PageInfo, { nullable: true })
    pageInfo?: PageInfo;
}
