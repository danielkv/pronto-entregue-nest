import { Args, ID, Info, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { ListCompaniesService } from '../services/list-companies.service';
import { CompaniesList } from '../types/companies.list';

import { PageInfo } from '../../common/types/page-info';
import { CompanyFilter } from '../types/company.filter';
import { CountCompaniesService } from '../services/count-companies.service';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { Company } from '../entities/company.entity';
import { GetCompanyService } from '../services/get-company.service';
import { GetCompanyConfigService } from '../services/get-company-config.service';
import { CompanyConfig } from '../types/company.config';
import { ExtractFieldsPipe } from 'src/modules/common/pipes/extract-fields.pipe';

@Resolver()
export class QueryCompanyResolver {
    constructor(
        private listCompaniesService: ListCompaniesService,
        private countCompanyService: CountCompaniesService,
        private getCompanyService: GetCompanyService,
        private getCompanyConfigService: GetCompanyConfigService,
    ) {}

    @Query(() => CompaniesList)
    async listCompanies(
        @Info(ExtractFieldsPipe) fields: string[],
        @Args('filter', { type: () => CompanyFilter, nullable: true })
        filter?,
        @Args('userLocation', { type: () => GeoPoint, nullable: true })
        userLocation?,
        @Args('pagination', { type: () => PageInfo, nullable: true })
        pagination?,
    ): Promise<CompaniesList> {
        const list: CompaniesList = { pageInfo: pagination };

        if (fields.includes('items'))
            list.items = await this.listCompaniesService.execute(filter, userLocation, pagination);

        if (fields.includes('countItems'))
            list.countItems = await this.countCompanyService.execute(filter, userLocation);

        return list;
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
        // map keys
        const keys = info.fieldNodes[0].selectionSet.selections.map(f => f.name.value);

        // return config
        return this.getCompanyConfigService.execute(companyId, keys);
    }

    // ordersStatusQty
}
