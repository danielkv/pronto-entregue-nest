import { Args, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { CompanyService } from '../company.service';
import { ListCompanies } from '../types/list-companies';

import { GraphQLJSONObject } from 'graphql-type-json';
import { PageInfo } from 'src/modules/graphql/types/page-info';

@Resolver()
export class CompanyResolver {
    constructor(private companyService: CompanyService) {}

    /* @Query(() => [Company])
    companies() {
        return this.companyService.findAll();
    } */

    @Query(() => ListCompanies)
    async listCompanies(
        @Args('filter', { type: () => GraphQLJSONObject, nullable: true })
        filter?,
        @Args('pagination', { type: () => PageInfo, nullable: true })
        pagination?,
    ): Promise<ListCompanies> {
        const items = await this.companyService.getCompanies(filter, pagination);
        const countItems = await this.companyService.countCompanies(filter);

        return {
            items,
            countItems,
            pageInfo: pagination,
        };
    }

    // ordersStatusQty
    // countCompanies
    // companies
    // company
    // companyConfig
}
