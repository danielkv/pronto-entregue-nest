import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IListEntity } from 'src/modules/common/interfaces/IListEntity';
import { PageInfo } from 'src/modules/common/types/page-info';
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
