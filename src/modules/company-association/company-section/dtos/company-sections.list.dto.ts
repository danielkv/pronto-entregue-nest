import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IListEntity } from '../../../common/interfaces/IListEntity';
import { PageInfo } from '../../../common/types/page-info';
import { CompanySection } from '../entities/company.type.entity';

@ObjectType()
export class CompanySectionsListDTO implements IListEntity<CompanySection> {
    @Field(() => [CompanySection], { nullable: 'items' })
    items?: CompanySection[];

    @Field(() => Int)
    countItems?: number;

    @Field(() => PageInfo, { nullable: true })
    pageInfo?: PageInfo;
}
