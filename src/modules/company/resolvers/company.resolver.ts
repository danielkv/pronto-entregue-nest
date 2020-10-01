import { Args, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { ListCompanyService } from '../services/list-companies.service';
import { ListCompanies } from '../types/list-companies';

import { PageInfo } from '../../common/types/page-info';
import { CompanyFilter } from '../types/company-filter';
import { CountCompaniesService } from '../services/count-companies.service';
import { GeoPoint } from 'src/modules/common/types/geo-point';

@Resolver()
export class CompanyResolver {
    constructor(
        private listCompanyService: ListCompanyService,
        private countCompanyService: CountCompaniesService,
    ) {}

    @Query(() => ListCompanies)
    async listCompanies(
        @Args('filter', { type: () => CompanyFilter, nullable: true })
        filter?,
        @Args('userLocation', { type: () => GeoPoint, nullable: true })
        userLocation?,
        @Args('pagination', { type: () => PageInfo, nullable: true })
        pagination?,
    ): Promise<ListCompanies> {
        console.log(userLocation);
        const items = await this.listCompanyService.execute(filter, pagination, userLocation);
        const countItems = await this.countCompanyService.execute(filter);

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
