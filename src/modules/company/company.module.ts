import { Module } from '@nestjs/common';
import { ListCompaniesService } from './services/list-companies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CompanyMeta } from './entities/company.meta.entity';
import { CompanyPaymentMethod } from './entities/company.payment.method.entity';
import { CompanySection } from './entities/company.type.entity';
import { CompanyUser } from './entities/company.user.entity';
import { QueryCompanyResolver } from './resolvers/query.company.resolver';
import { CompanySearchFilter } from './filters/company.search.filter';
import { CompaniesList } from './types/companies.list';
import { CountCompaniesService } from './services/count-companies.service';
import { CompanyUserLocationSelection } from './helpers/company.user.location.selection';
import { CompanyMapper } from './helpers/company-mapper';
import { CompanyLocationFilter } from './filters/company.location.filter';
import { CompanyFilterHelper } from './helpers/company.filter.helper';
import { CompanyBaseSelection } from './helpers/company.base.selection';
import { CompanyAreasSelection } from './helpers/company.areas.selection';
import { GetCompanyConfigService } from './services/get-company-config.service';
import { GetCompanyService } from './services/get-company.service';
import { GetCompanyMetaService } from './services/get.company.meta.service';
import { CompanyResolver } from './resolvers/company.resolver';
import { CompanyConfigLoader } from './loaders/company.config.loader';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { CompanyFilter } from './types/company.filter';
import { CompanyConfig } from './types/company.config';
import { CompanyActiveFilter } from './filters/company.active.filter';
import { CompanyPublishedFilter } from './filters/company.published.filter';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Company,
            CompanyMeta,
            CompanyPaymentMethod,
            CompanySection,
            CompanyUser,
        ]),
        CompaniesList,
        CompanyFilter,
        CompanyConfig,
    ],
    providers: [
        QueryCompanyResolver,

        ListCompaniesService,
        CountCompaniesService,

        CompanyMapper,

        CompanyFilterHelper,
        CompanySearchFilter,
        CompanyLocationFilter,
        CompanyActiveFilter,
        CompanyPublishedFilter,

        CompanyBaseSelection,
        CompanyAreasSelection,
        CompanyUserLocationSelection,
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
