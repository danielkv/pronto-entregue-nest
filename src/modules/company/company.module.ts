import { Module } from '@nestjs/common';
import { ListCompaniesService } from './services/list-companies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CompanyMeta } from './entities/company.meta.entity';
import { CompanyPaymentMethod } from './entities/company.payment.method.entity';
import { CompanySection } from './entities/company.type.entity';
import { CompanyUser } from './entities/company.user.entity';
import { QueryCompanyResolver } from './resolvers/query.company.resolver';
import { FilterSearch } from './helpers/filter.search';
import { ListCompanies } from './types/list-companies';
import { CountCompaniesService } from './services/count-companies.service';
import { SelectUserLocation } from './helpers/select.user.location';
import { CompanyMapper } from './helpers/company-mapper';
import { FilterLocation } from './helpers/filter.location';
import { CompanyFilterHelper } from './helpers/company-filter-helper';
import { CompanyBaseSelection } from './helpers/company-base-selection';
import { SelectAreas } from './helpers/select.areas';
import { GetCompanyConfigService } from './services/get-company-config.service';
import { GetCompanyService } from './services/get-company.service';
import { GetCompanyMetaService } from './services/get.company.meta.service';
import { CompanyResolver } from './resolvers/company.resolver';
import { CompanyConfigLoader } from './loaders/company.config.loader';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { CompanyFilter } from './types/company-filter';
import { CompanyConfig } from './types/company-config';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Company,
            CompanyMeta,
            CompanyPaymentMethod,
            CompanySection,
            CompanyUser,
        ]),
        ListCompanies,
        CompanyFilter,
        CompanyConfig,
    ],
    providers: [
        QueryCompanyResolver,

        ListCompaniesService,
        CountCompaniesService,

        CompanyMapper,

        CompanyFilterHelper,
        FilterSearch,
        FilterLocation,

        CompanyBaseSelection,
        SelectAreas,
        SelectUserLocation,
        GetCompanyService,
        GetCompanyConfigService,
        GetCompanyMetaService,
        CompanyResolver,
        CompanyConfigLoader,
        {
            provide: APP_INTERCEPTOR,
            useClass: DataLoaderInterceptor,
        },
    ],
})
export class CompanyModule {}
