import { Args, ID, Info, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { ListCompaniesService } from '../services/list-companies.service';
import { ListCompanies } from '../types/list-companies';

import { PageInfo } from '../../common/types/page-info';
import { CompanyFilter } from '../types/company-filter';
import { CountCompaniesService } from '../services/count-companies.service';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { Company } from '../entities/company.entity';
import { GetCompanyService } from '../services/get-company.service';
import { GetCompanyConfigService } from '../services/get-company-config.service';
import { CompanyConfig } from '../types/company-config';

@Resolver()
export class CompanyResolver {
    constructor(
        private listCompaniesService: ListCompaniesService,
        private countCompanyService: CountCompaniesService,
        private getCompanyService: GetCompanyService,
        private getCompanyConfigService: GetCompanyConfigService,
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
        const items = await this.listCompaniesService.execute(filter, userLocation, pagination);
        const countItems = await this.countCompanyService.execute(filter, userLocation);

        return {
            items,
            countItems,
            pageInfo: pagination,
        };
    }

    @Query(() => Company)
    company(
        @Args('companyId', { type: () => ID }) companyId: number,
        @Args('userLocation', { type: () => GeoPoint, nullable: true })
        userLocation?,
    ): Promise<Company> {
        return this.getCompanyService.execute(companyId, userLocation);
    }

    @Query(() => CompanyConfig)
    companyConfig(@Args('companyId', { type: () => ID }) companyId: number, @Info() info) {
        const keys = info.fieldNodes[0].selectionSet.selections.map(f => f.name.value);
        return this.getCompanyConfigService.execute(companyId, keys);
    }

    // ordersStatusQty
}
