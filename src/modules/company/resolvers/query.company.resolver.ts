import { Args, ID, Info, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { ListCompaniesService } from '../services/list-companies.service';
import { CompaniesList } from '../dtos/companies.list';

import { PageInfo } from '../../common/types/page-info';
import { CompanyFilterDTO } from '../dtos/company.filter';
import { CountCompaniesService } from '../services/count-companies.service';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { Company } from '../entities/company.entity';
import { GetCompanyService } from '../services/get-company.service';
import { GetCompanyConfigService } from '../services/get-company-config.service';
import { CompanyConfigDTO, ICompanyConfigKeys } from '../dtos/company.config';
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
        @Args('filter', { type: () => CompanyFilterDTO, nullable: true })
        filter?,
        @Args('userLocation', { type: () => GeoPoint, nullable: true })
        userLocation?: GeoPoint,
        @Args('pagination', { type: () => PageInfo, nullable: true })
        pagination?: PageInfo,
    ): Promise<CompaniesList> {
        const list: CompaniesList = { pageInfo: pagination };

        if (fields.includes('items'))
            list.items = await this.listCompaniesService.execute(filter, pagination, userLocation);

        if (fields.includes('countItems'))
            list.countItems = await this.countCompanyService.execute(filter, userLocation);

        return list;
    }

    @Query(() => Company)
    company(
        @Args('companyId', { type: () => ID }) companyId: number,
        @Args('userLocation', { type: () => GeoPoint, nullable: true })
        userLocation?: GeoPoint,
    ): Promise<Company> {
        return this.getCompanyService.execute(companyId, userLocation);
    }

    @Query(() => CompanyConfigDTO)
    companyConfig(
        @Args('companyId', { type: () => ID }) companyId: number,
        @Info(ExtractFieldsPipe) keys: ICompanyConfigKeys[],
    ) {
        // return config
        return this.getCompanyConfigService.execute(companyId, keys);
    }

    // ordersStatusQty
}
