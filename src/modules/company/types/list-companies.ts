import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IListEntity } from '../../common/interfaces/IListEntity';
import { PageInfo } from '../../common/types/page-info';
import { Company } from '../entities/company.entity';

@ObjectType()
export class ListCompanies implements IListEntity<Company> {
    @Field(() => [Company])
    items: Company[];

    @Field(() => Int)
    countItems: number;

    @Field(() => PageInfo, { nullable: true })
    pageInfo?: PageInfo;
}
